import { Body, Controller, Delete, Get, Param, Post, Put,UseGuards } from '@nestjs/common';
import { ServiceService } from './services.service';
import { JwtAuthGuard } from 'src/auth/auth.guard';

@Controller('services')
export class ServiceController {
  constructor(private readonly serviceService: ServiceService) {}

  @UseGuards(JwtAuthGuard)
  @Post('create-service')
  async create(@Body() data: any) {
    return this.serviceService.createService(data);
  }

  @UseGuards(JwtAuthGuard)
  @Get('get-services')
  async findAll() {
    return this.serviceService.getAllServices();
  }

  @UseGuards(JwtAuthGuard)
  @Get(':id')
  async findOne(@Param('id') id: number) {
    return this.serviceService.getServiceById(id);
  }

  @UseGuards(JwtAuthGuard)
  @Put(':id')
  async update(@Param('id') id: number, @Body() data: any) {
    return this.serviceService.updateService(id, data);
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  async remove(@Param('id') id: number) {
    return this.serviceService.deleteService(id);
  }
}
