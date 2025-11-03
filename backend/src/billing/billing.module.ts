import { Module } from '@nestjs/common';
import { BillingService } from './billing.service';
import { BillingController } from './billing.controller';
import { PrismaModule } from '../prisma/prisma.module';
import { AuthModule } from '../auth/auth.module'; // <-- Adicione esta linha

@Module({
  imports: [PrismaModule, AuthModule], // <-- Adicione o AuthModule aqui
  controllers: [BillingController],
  providers: [BillingService],
})
export class BillingModule {}