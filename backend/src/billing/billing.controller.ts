import { Controller, Get, Post, Body, UseGuards, Request } from '@nestjs/common';
import { BillingService } from './billing.service';
import { CreateBillingDto } from './dto/create-billing.dto';
import { AuthGuard } from '../auth/auth.guard';

@UseGuards(AuthGuard)
@Controller('api/billing')
export class BillingController {
  constructor(private readonly billingService: BillingService) {}

  @Post()
  create(@Body() createBillingDto: CreateBillingDto, @Request() req) {
    const userId = req.user.sub; // Pega o ID do usuário logado
    return this.billingService.create(createBillingDto, userId);
  }

  @Get()
  findAll(@Request() req) {
    const userId = req.user.sub; // Pega o ID do usuário logado
    return this.billingService.findAll(userId);
  }
}