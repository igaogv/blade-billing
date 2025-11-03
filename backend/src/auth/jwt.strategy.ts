import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { ConfigService } from '@nestjs/config';
import { UsersService } from '../users/users.service';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    private configService: ConfigService,
    private usersService: UsersService, // Usamos para verificar se o usuário do token ainda existe
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: configService.get<string>('JWT_SECRET'), // Pega a chave secreta do seu .env
    });
  }

  // Esta função é chamada automaticamente após o token ser decodificado
  async validate(payload: any) {
    const user = await this.usersService.findOneByEmail(payload.email);
    if (!user) {
      throw new UnauthorizedException('Usuário não encontrado.');
    }
    // O que for retornado aqui será injetado no objeto `req.user` dos seus controllers
    return { userId: payload.sub, email: payload.email, name: payload.name };
  }
}