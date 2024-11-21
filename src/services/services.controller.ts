import { Body, Controller, Delete, Get, Param, Post, Put,UseGuards } from '@nestjs/common';
import { ServicesService } from './services.service';
import { JwtAuthGuard } from 'src/auth/auth.guard';
import { serviceDto } from './services.dto';

@Controller('services')
export class ServicesController {
  constructor(private readonly serviceService: ServicesService) {}

  @UseGuards(JwtAuthGuard)
  @Post('create')
  async create(@Body() serviceDto: serviceDto) {
    const { name, location, phonenumber, address, services_offered, description, images,category_id,user_id,profile_image } = serviceDto;
  
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
      category_id,
      user_id,
      profile_image
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
  @Get('get-services-by-category/:categoryId')
  async getServicesByCategory(@Param('categoryId') categoryId: number) {
    return this.serviceService.getServicesByCategory(categoryId);
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

