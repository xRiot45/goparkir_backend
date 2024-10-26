import { Injectable } from '@nestjs/common';
import { EntityManager } from 'typeorm';
import { Kendaraan } from '../kendaraan/entities/kendaraan.entity';
import { Transaksi } from './entities/transaksi.entity';
import { User } from '../users/entities/user.entity';

@Injectable()
export class TransaksiService {
  constructor(private readonly entityManager: EntityManager) {}
  async createTransaksi(request: any, qr_code: string) {
    const { userId } = request;

    // Daftar harga per jenis kendaraan
    const jumlahTransaksiMotor = 2000;
    const jumlahTransaksiMobilRodaEmpat = 3000;
    const jumlahTransaksiMobilRodaEmpatSatuTon = 5000;
    const jumlahTransaksiMobilRodaEnamKeAtas = 6000;

    let jumlah_transaksi = 0;

    try {
      // Cek QR code di database dan ambil data kendaraan
      const kendaraan = await this.entityManager.findOne(Kendaraan, {
        where: { kode_qr: qr_code },
      });

      if (!kendaraan) {
        throw new Error(
          `Kendaraan dengan QR Code '${qr_code}' tidak ditemukan.`,
        );
      }

      // Menentukan jumlah transaksi berdasarkan jenis kendaraan
      switch (kendaraan.jenis) {
        case 'Sepeda Motor':
          jumlah_transaksi = jumlahTransaksiMotor;
          break;
        case 'Mobil Roda Empat':
          jumlah_transaksi = jumlahTransaksiMobilRodaEmpat;
          break;
        case 'Mobil Roda Empat Satu Ton':
          jumlah_transaksi = jumlahTransaksiMobilRodaEmpatSatuTon;
          break;
        case 'Mobil Roda Enam Ke Atas':
          jumlah_transaksi = jumlahTransaksiMobilRodaEnamKeAtas;
          break;
        default:
          throw new Error(`Jenis kendaraan '${kendaraan.jenis}' tidak valid.`);
      }

      // Ambil data user dan cek role
      const user = await this.entityManager.findOne(User, {
        where: { id: userId },
      });

      if (!user) {
        throw new Error(`User dengan ID '${userId}' tidak ditemukan.`);
      }

      if (user.role === 'Pengendara') {
        // Cek apakah saldo cukup
        if (user.saldo < jumlah_transaksi) {
          throw new Error('Saldo tidak mencukupi untuk melakukan transaksi.');
        }

        // Kurangi saldo user
        user.saldo -= jumlah_transaksi;

        // Simpan perubahan saldo ke database
        await this.entityManager.save(User, user);
      }

      // Fungsi untuk menghitung pembagian pendapatan
      const hitungPembagianPendapatan = (total: number) => {
        const developerProfit = total * 0.2;
        const tukangParkirRevenue = total * 0.4;
        const pemerintahRevenue = total * 0.4;

        return {
          developerProfit,
          tukangParkirRevenue,
          pemerintahRevenue,
        };
      };

      const pembagian_pendapatan = hitungPembagianPendapatan(jumlah_transaksi);

      const lokasi_parkir = 'Toko Sembako Murah';

      // Jika user berperan sebagai Juru Parkir, tambahkan tukangParkirRevenue ke saldo
      if (user.role === 'Juru Parkir') {
        user.saldo += pembagian_pendapatan.tukangParkirRevenue;

        // Simpan perubahan saldo ke database
        await this.entityManager.save(User, user);
      }

      // Membuat objek transaksi dan menyimpan ID kendaraan
      const transaksi = new Transaksi();
      transaksi.userId = userId;
      transaksi.kendaraanId = kendaraan; // Simpan objek kendaraan terkait
      transaksi.jumlah_transaksi = jumlah_transaksi;
      transaksi.pembagian_pendapatan = pembagian_pendapatan;
      transaksi.lokasi_parkir = lokasi_parkir;

      // Simpan transaksi ke database
      const savedTransaksi = await this.entityManager.save(
        Transaksi,
        transaksi,
      );

      return savedTransaksi;
    } catch (error) {
      console.error('Terjadi kesalahan:', error.message);
      throw error;
    }
  }

  async findAllTransaksi(): Promise<any> {
    const transaksi = await this.entityManager.find(Transaksi, {
      relations: ['kendaraanId'],
    });
    return transaksi;
  }

  async findTransaksiById(id: string): Promise<any> {
    const transaksi = await this.entityManager.findOne(Transaksi, {
      where: { id },
      relations: ['kendaraanId'],
    });
    return transaksi;
  }
}
