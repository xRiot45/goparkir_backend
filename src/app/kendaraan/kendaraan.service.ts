import { Injectable } from '@nestjs/common';
import { EntityManager } from 'typeorm';
import { Kendaraan } from './entities/kendaraan.entity';
import { generateRandomString } from 'src/common/helpers/barcode';

@Injectable()
export class KendaraanService {
  constructor(private readonly entityManager: EntityManager) {}

  async createKendaraan(request: any) {
    const {
      jenis,
      plat_nomor,
      brand,
      model,
      tahun_keluaran,
      warna,
      nomor_mesin,
      rangka_kendaraan,
      userId,
    } = request;

    const kodeQr = generateRandomString(10);

    const kendaraan = this.entityManager.create(Kendaraan, {
      jenis,
      plat_nomor,
      brand,
      model,
      tahun_keluaran,
      warna,
      nomor_mesin,
      rangka_kendaraan,
      kode_qr: kodeQr,
      userId,
    });
    const savedKendaraan = await this.entityManager.save(kendaraan);

    return savedKendaraan;
  }

  async findAllKendaraanByUserIdService(userId: number): Promise<Kendaraan[]> {
    const kendaraan = await this.entityManager
      .createQueryBuilder(Kendaraan, 'kendaraan')
      .where('kendaraan.userId = :userId', { userId })
      .getMany();
    return kendaraan;
  }

  async findKendaraanByIdService(id: string): Promise<any> {
    const kendaraan = await this.entityManager
      .createQueryBuilder(Kendaraan, 'kendaraan')
      .where('kendaraan.id = :id', { id })
      .getOne();
    return kendaraan;
  }
}
