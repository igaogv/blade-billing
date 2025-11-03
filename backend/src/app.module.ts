import { Module } from '@nestjs/common';
import { PrismaModule } from './prisma/prisma.module';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { ClientsModule } from './clients/clients.module';
import { BillingModule } from './billing/billing.module';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    // Esta configuração torna o ConfigService disponível globalmente
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    
    // Agora o NestJS carrega os outros módulos
    PrismaModule,
    AuthModule, // O AuthModule agora é global e proverá o AuthGuard para todos
    UsersModule,
    ClientsModule,
    BillingModule,
  ],
})
export class AppModule {}