import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateBillingDto } from './dto/create-billing.dto';

@Injectable()
export class BillingService {
  constructor(private prisma: PrismaService) {}

  create(createBillingDto: CreateBillingDto, userId: string) {
    return this.prisma.billing.create({
      data: {
        value: createBillingDto.amount, // Corrigido para 'value'
        dueDate: new Date(createBillingDto.dueDate),
        client: { connect: { id: createBillingDto.clientId } },
        user: { connect: { id: userId } },
      },
    });
  }

  findAll(userId: string) {
    return this.prisma.billing.findMany({
      where: { userId },
      include: {
        client: { select: { name: true } },
      },
    });
  }
}