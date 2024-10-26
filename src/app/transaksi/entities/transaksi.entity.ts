import { Kendaraan } from 'src/app/kendaraan/entities/kendaraan.entity';
import { User } from 'src/app/users/entities/user.entity';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'transaksi' })
export class Transaksi {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({
    type: 'int',
  })
  jumlah_transaksi: number;

  @Column({
    type: 'json',
    nullable: false,
  })
  pembagian_pendapatan: {
    developerProfit: number;
    tukangParkirRevenue: number;
    pemerintahRevenue: number;
  };

  // @Column({
  //   type: 'json',
  //   nullable: false,
  // })
  // data_kendaraan: {
  //   jenis: string;
  //   plat_nomor: string;
  //   brand: string;
  //   model: string;
  //   tahun_keluaran: string;
  //   warna: string;
  //   nomor_mesin: string;
  //   rangka_kendaraan: string;
  //   kode_qr: string;
  // };

  @Column({
    type: 'varchar',
  })
  lokasi_parkir: string;

  @ManyToOne(() => Kendaraan, (kendaraan) => kendaraan.id)
  kendaraanId: Kendaraan;

  @ManyToOne(() => User, (user) => user.id)
  userId: User;
}
