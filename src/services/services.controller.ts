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
    const { firstname,lastname,email,brandname, location, phonenumber,description, images,category,services} = serviceDto;
  
    return this.serviceService.createService(
      firstname,
      lastname,
      email,
      phonenumber,
      brandname,
      description,
      category,
      location,
      images,
      services,
    );
  }
  

  @UseGuards(JwtAuthGuard)
  @Get('get-services')
  async findAll() {
    return this.serviceService.getAllServices();
  }

  @UseGuards(JwtAuthGuard)
  @Get(':id')
  async findOne(@Param('id') id: string) {
    return this.serviceService.getServiceById(Number(id)); // Convert to number
  }

  @UseGuards(JwtAuthGuard)
  @Get('get-services-by-category/:categoryId')
  async getServicesByCategory(@Param('categoryId') categoryId: number) {
    return this.serviceService.getServicesByCategory(categoryId);
  }

  @UseGuards(JwtAuthGuard)
  @Put(':id')
  async update(@Param('id') id: string, @Body() data: any) {
    return this.serviceService.updateService(Number(id), data);
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  async remove(@Param('id') id: string) {
    return this.serviceService.deleteService(Number(id)); 
  }

  @UseGuards(JwtAuthGuard)
  @Post('approve-service')
  async approveServiceProvider(@Body() body: any) {
    return this.serviceService.approveServiceProvider(Number(body.id));
  }
}

