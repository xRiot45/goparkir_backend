import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { TransaksiService } from './transaksi.service';

@Controller('/api/transaksi')
export class TransaksiController {
  constructor(private readonly transaksiService: TransaksiService) {}

  @Post('/create/:qr_code')
  async createTransaksiController(
    @Body() request: any,
    @Param('qr_code') qr_code: any,
  ) {
    return this.transaksiService.createTransaksi(request, qr_code);
  }

  @Get('/all')
  async findAllTransaksiController() {
    return this.transaksiService.findAllTransaksi();
  }

  @Get('/:id')
  async findTransaksiByIdController(@Param('id') id: string) {
    return this.transaksiService.findTransaksiById(id);
  }
}
