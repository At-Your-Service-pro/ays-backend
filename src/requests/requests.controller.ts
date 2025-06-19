import { Controller, Get, Post, Param, Body, Delete } from '@nestjs/common';
import { RequestsService } from './requests.service';
import { requestDto } from './request.dto';

@Controller('requests')
export class RequestsController {
  constructor(private readonly requestsService: RequestsService) {}

  @Post()
  create(@Body() requestDto: requestDto) {
    const {userId,brandname,service,price,location} = requestDto;
    return this.requestsService.create(
        userId,brandname,service,price,location
    );
  }

  @Get()
  findAll() {
    return this.requestsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.requestsService.findOne(Number(id));
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.requestsService.remove(Number(id));
  }
}
