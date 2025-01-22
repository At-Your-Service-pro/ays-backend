import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { Cron } from '@nestjs/schedule';
import axios from 'axios';
import { Knex } from 'knex';

@Injectable()
export class SubscriptionService {
  private readonly PAYSTACK_SECRET_KEY = 'your_paystack_secret_key'; // Replace with your secret key
  private readonly PAYSTACK_BASE_URL = 'https://api.paystack.co';

  constructor(private readonly knex: Knex) {}

  // Step 1: Initialize Payment
  async initializePayment(email: string, amount: number) {
    try {
      const response = await axios.post(
        `${this.PAYSTACK_BASE_URL}/transaction/initialize`,
        {
          email,
          amount: amount * 100, // Amount in kobo (Paystack processes in the smallest unit)
        },
        {
          headers: {
            Authorization: `Bearer ${this.PAYSTACK_SECRET_KEY}`,
          },
        },
      );

      return response.data.data; // Returns the payment URL and other details
    } catch (error) {
      throw new HttpException(
        error.response?.data?.message || 'Payment initialization failed',
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  // Step 2: Verify Payment
  async verifyPayment(reference: string) {
    try {
      const response = await axios.get(
        `${this.PAYSTACK_BASE_URL}/transaction/verify/${reference}`,
        {
          headers: {
            Authorization: `Bearer ${this.PAYSTACK_SECRET_KEY}`,
          },
        },
      );

      const data = response.data.data;
      if (data.status !== 'success') {
        throw new Error('Payment not successful');
      }

      return data; // Contains payment details like amount, status, reference, etc.
    } catch (error) {
      throw new HttpException(
        error.response?.data?.message || 'Payment verification failed',
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  // Step 3: Process Payment and Update Database
  async processPayment(serviceProviderId: number, reference: string) {
    // Verify payment with Paystack
    const paymentDetails = await this.verifyPayment(reference);

    // Ensure the payment amount matches the expected subscription fee
    const expectedAmount = 20 * 100; // $20 in kobo
    if (paymentDetails.amount !== expectedAmount) {
      throw new HttpException('Invalid payment amount', HttpStatus.BAD_REQUEST);
    }

    // Store payment record
    await this.knex('payments').insert({
      service_provider_id: serviceProviderId,
      amount: paymentDetails.amount / 100, // Convert back to dollars
      payment_date: new Date(),
    });

    // Update service provider's subscription status
    const subscriptionEndDate = new Date();
    subscriptionEndDate.setMonth(subscriptionEndDate.getMonth() + 1); // Add 1 month

    await this.knex('services-providers')
      .where({ id: serviceProviderId })
      .update({
        supscribtion_status: true,
        subscription_end_date: subscriptionEndDate,
      });

      const services = await this.knex('services').where({ service_provider_id: serviceProviderId });

      // Update each service's status
      await this.knex('services')
        .where({ service_provider_id: serviceProviderId })
        .update({ status: 'active' });

    return {
      message: 'Payment processed successfully and subscription updated',
      subscriptionEndDate,
      servicesUpdated: services.length,
    };
  }

  @Cron('0 0 * * *') // Run daily at midnight
  async handleSubscriptionExpiry() {
    const today = new Date();
  
    // Notify providers whose subscription expires today
    const dueProviders = await this.knex('service_providers')
      .whereRaw('DATE(subscription_end_date) = ?', [today.toISOString().split('T')[0]])
      .andWhere('service_active', true);
  
   dueProviders.forEach(provider => {
     return {
      message: 'Please renew your subscription within 5 days to avois deactivation';
     }
   });
  
    // Add 5 days to today's date to calculate the grace period expiration date
    const graceDate = new Date(today);
    graceDate.setDate(today.getDate() + 5); // Add 5 days to the subscription_end_date
  
    // Find providers whose 5-day grace period has passed
    const expiredProviders = await this.knex('service-providers')
      .whereRaw('DATE(subscription_end_date) = ?', [graceDate.toISOString().split('T')[0]])
      .andWhere('supscription_status', true);
  
    for (const provider of expiredProviders) {
      // Deactivate all services under the expired provider
      await this.knex('services')
        .where({ service_provider_id: provider.id })
        .update({ status: 'inactive' });
  
      // Update the provider's active status
      await this.knex('service-providers')
        .where({ id: provider.id })
        .update({
          supscription_status: false,
        });
  
      return {
        message: `Deactivated services and subscription for provider ID ${provider.id}.`
      }
    }
  
    console.log(
      `${expiredProviders.length} subscriptions expired beyond the 5-day grace period and were deactivated.`,
    );
  }
  

}
