// Caminho: backend/prisma/seed.ts

import { PrismaClient } from '@prisma/client';
import * as bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

async function main() {
  console.log(`Iniciando o seeding...`);

  const salt = await bcrypt.genSalt();
  const hashedPassword = await bcrypt.hash('123456', salt);

  const user = await prisma.user.upsert({
    where: { email: 'admin@barbersaas.com' },
    update: {},
    create: {
      name: 'Admin Barber',
      email: 'admin@barbersaas.com',
      password: hashedPassword,
      barbershopName: 'Barbearia Admin',
    },
  });

  console.log(`Seeding finalizado. Usuário criado/atualizado: ${user.email}`);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });