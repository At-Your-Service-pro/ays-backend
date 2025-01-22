import { Controller, Post, Body, Param } from '@nestjs/common';
import { SubscriptionService } from './subscription.service';

@Controller('subscriptions')
export class SubscriptionController {
  constructor(private readonly subscriptionService: SubscriptionService) {}

  // Endpoint to initialize payment
  @Post('initialize')
  async initializePayment(@Body('email') email: string, @Body('amount') amount: number) {
    return this.subscriptionService.initializePayment(email, amount);
  }

  // Endpoint to verify and process payment
  @Post('process/:serviceProviderId')
  async processPayment(
    @Param('serviceProviderId') serviceProviderId: number,
    @Body('reference') reference: string,
  ) {
    return this.subscriptionService.processPayment(serviceProviderId, reference);
  }
}
