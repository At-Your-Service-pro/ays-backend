import { Controller, Get, Post, Param, Body, Delete,UseGuards } from '@nestjs/common';
import { RequestsService } from './requests.service';
import { requestDto } from './request.dto';
import { JwtAuthGuard } from 'src/auth/auth.guard';

@Controller('requests')
export class RequestsController {
  constructor(private readonly requestsService: RequestsService) {}

@UseGuards(JwtAuthGuard)
  @Post('create')
  create(@Body() requestDto: requestDto) {
    const {userId,brandname,service,price,location} = requestDto;
    return this.requestsService.create(
        userId,brandname,service,price,location
    );
  }

  @UseGuards(JwtAuthGuard)
  @Get('get-requests')
  findAll() {
    return this.requestsService.findAll();
  }

  @UseGuards(JwtAuthGuard)
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.requestsService.findOne(Number(id));
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.requestsService.remove(Number(id));
  }
}
