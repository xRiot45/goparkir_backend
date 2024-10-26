import { Transaksi } from 'src/app/transaksi/entities/transaksi.entity';
import { User } from 'src/app/users/entities/user.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity({ name: 'kendaraan' })
export class Kendaraan {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({
    type: 'varchar',
  })
  jenis: string;

  @Column({
    type: 'varchar',
  })
  plat_nomor: string;

  @Column({
    type: 'varchar',
  })
  brand: string;

  @Column({
    type: 'varchar',
  })
  model: string;

  @Column({
    type: 'varchar',
  })
  tahun_keluaran: string;

  @Column({
    type: 'varchar',
  })
  warna: string;

  @Column({
    type: 'varchar',
  })
  nomor_mesin: string;

  @Column({
    type: 'varchar',
  })
  rangka_kendaraan: string;

  @Column({
    type: 'varchar',
  })
  kode_qr: string;

  @ManyToOne(() => User, (user) => user.id)
  userId: User;

  @OneToMany(() => Transaksi, (transaksi) => transaksi.kendaraanId)
  transaksi: Transaksi[];

  @CreateDateColumn({
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP(6)',
  })
  createdAt: Date;

  @CreateDateColumn({
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP(6)',
    onUpdate: 'CURRENT_TIMESTAMP(6)',
  })
  updatedAt: Date;

  constructor(partial: Partial<Kendaraan>) {
    Object.assign(this, partial);
  }
}
