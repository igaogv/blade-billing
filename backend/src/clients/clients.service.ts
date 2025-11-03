import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateClientDto } from './dto/create-client.dto';

@Injectable()
export class ClientsService {
  constructor(private prisma: PrismaService) {}

  async create(data: CreateClientDto) {
    return this.prisma.client.create({
      data,
    });
  }

  async findAll() {
    return this.prisma.client.findMany();
  }
}
