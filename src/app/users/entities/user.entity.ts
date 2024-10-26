import { Kendaraan } from 'src/app/kendaraan/entities/kendaraan.entity';
import { Transaksi } from 'src/app/transaksi/entities/transaksi.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity({ name: 'users' })
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({
    type: 'varchar',
    unique: true,
    nullable: false,
    length: 100,
  })
  email: string;

  @Column({
    type: 'varchar',
    nullable: false,
    length: 100,
  })
  username: string;

  @Column({
    type: 'varchar',
    length: 255,
    nullable: false,
  })
  password: string;

  @Column({
    type: 'varchar',
    nullable: false,
    length: 100,
  })
  role: string;

  @Column({
    type: 'int',
  })
  saldo: number;

  @OneToMany(() => Transaksi, (transaksi) => transaksi.userId)
  transaksi: Transaksi[];

  @OneToMany(() => Kendaraan, (kendaraan) => kendaraan.userId)
  kendaraan: Kendaraan[];

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

  constructor(partial: Partial<User>) {
    Object.assign(this, partial);
  }
}
