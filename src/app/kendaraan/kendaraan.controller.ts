import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { KendaraanService } from './kendaraan.service';

@Controller('/api/kendaraan')
export class KendaraanController {
  constructor(private readonly kendaraanService: KendaraanService) {}

  @Post('/create')
  create(@Body() req: any) {
    return this.kendaraanService.createKendaraan(req);
  }

  @Get('/all/:userId')
  async findAllKendaraanByUserIdController(@Param('userId') userId: any) {
    return this.kendaraanService.findAllKendaraanByUserIdService(userId);
  }

  @Get('/:id')
  async findKendaraanByIdController(@Param('id') id: string) {
    return this.kendaraanService.findKendaraanByIdService(id);
  }
}
