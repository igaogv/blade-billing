import { Module } from '@nestjs/common';
import { ClientsService } from './clients.service';
import { ClientsController } from './clients.controller';
import { PrismaModule } from '../prisma/prisma.module';
import { AuthModule } from '../auth/auth.module'; // <-- Adicione esta linha

@Module({
  imports: [PrismaModule, AuthModule], // <-- Adicione o AuthModule aqui
  controllers: [ClientsController],
  providers: [ClientsService],
})
export class ClientsModule {}