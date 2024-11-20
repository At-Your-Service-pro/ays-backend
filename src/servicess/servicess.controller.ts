import { Body, Controller, Delete, Get, Param, Post, Put,UseGuards } from '@nestjs/common';
import { ServiceService } from './servicess.service';
import { JwtAuthGuard } from 'src/auth/auth.guard';

@Controller('services')
export class ServiceController {
  constructor(private readonly serviceService: ServiceService) {}

  @UseGuards(JwtAuthGuard)
  @Post('create')
  async create(@Body() serviceDto: {
    name: string,
    location: string,
    phonenumber: string,
    address: string,
    services_offered: {
      service_name: string,
      service_price: number, // Keep as number in the DTO
    }[],
    description: string,
    images: string[],
    category_id: number
  }) {
    const { name, location, phonenumber, address, services_offered, description, images,category_id } = serviceDto;
  
    // Convert service_price to string
    const formattedServicesOffered = services_offered.map((service) => ({
      ...service,
      service_price: service.service_price.toString(),
    }));
  
    return this.serviceService.createService(
      name,
      location,
      phonenumber,
      address,
      formattedServicesOffered, // Pass formatted data
      description,
      images,
      category_id
    );
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


