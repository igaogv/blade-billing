// ARQUIVO: backend/src/main.ts

import { NestFactory } from '@nestjs/core';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Habilita o CORS para o frontend poder se comunicar com o backend
  app.enableCors();

  // ***** LINHA A SER ADICIONADA *****
  // Define que todas as rotas da sua API começarão com /api
  app.setGlobalPrefix('api');
  
  // Habilita a validação automática para os DTOs em toda a aplicação
  app.useGlobalPipes(new ValidationPipe());

  // --- CONFIGURAÇÃO DO SWAGGER ---
  const config = new DocumentBuilder()
    .setTitle('Blade Billing API')
    .setDescription('Documentação da API para o sistema de gestão de barbearias')
    .setVersion('1.0')
    .addBearerAuth()
    .build();
  
  const document = SwaggerModule.createDocument(app, config);
  // Agora a documentação estará em /api/docs para não conflitar com as rotas
  SwaggerModule.setup('api/docs', app, document);

  await app.listen(3000);
}
bootstrap();