import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { UsersModule } from '../users/users.module';
import { JwtModule } from '@nestjs/jwt';
import { AuthController } from './auth.controller';
import { ConfigService } from '@nestjs/config';
import { AuthGuard } from './auth.guard';
import { JwtStrategy } from './jwt.strategy';
import { PassportModule } from '@nestjs/passport';

@Module({
  imports: [
    UsersModule,
    PassportModule.register({ defaultStrategy: 'jwt' }),
    // Configura o JwtModule aqui dentro
    JwtModule.registerAsync({
      inject: [ConfigService],
      useFactory: (config: ConfigService) => {
        return {
          secret: config.get<string>('JWT_SECRET'),
          signOptions: { expiresIn: '60m' },
        };
      },
    }),
  ],
  providers: [AuthService, AuthGuard, JwtStrategy],
  controllers: [AuthController],
  // EXPORTE as ferramentas para outros módulos poderem usá-las
  exports: [AuthGuard, JwtModule],
})
export class AuthModule {}