import { Module } from '@nestjs/common';
import { KendaraanModule } from './kendaraan/kendaraan.module';
import { TransaksiModule } from './transaksi/transaksi.module';
import { UsersModule } from './users/users.module';

@Module({
  imports: [UsersModule, TransaksiModule, KendaraanModule],
  providers: [],
})
export class AppModule {}
