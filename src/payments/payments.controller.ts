import { Controller,UseGuards,Post,Get,Body} from '@nestjs/common';
import {PaymentsService} from './payments.service'
import { JwtAuthGuard } from 'src/auth/auth.guard';

@Controller('payments')
export class PaymentsController {
    constructor (private readonly paymentService: PaymentsService){}

    @UseGuards(JwtAuthGuard)
    @Get('get')
        async getPayments() {
            return this.paymentService.get();
        }
    

}
