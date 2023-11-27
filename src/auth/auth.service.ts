import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { HashService } from '../helper/hash.services';
import * as dotenv from 'dotenv';
import { PrismaService } from 'src/prisma.service';
dotenv.config();
@Injectable()
export class AuthService {
  constructor(
    private hashService: HashService,
    private jwtService: JwtService,
    private prisma: PrismaService,
  ) {}

  async validateUser(email: string, pass: string): Promise<any> {
    const user = await this.prisma.user.findFirst({
      where: {
        email: email,
      },
    });
    if (user) {
      const checkIfCorrectPassword = await this.hashService.comparePassword(
        pass,
        user.password,
      );
      if (!checkIfCorrectPassword) {
        throw new UnauthorizedException('Incorrect password');
      }
      const result = user;
      return result;
    }
    throw new UnauthorizedException('Email not found');
  }

  async login(user: any) {
    const payload = {
      email: user.email,
      sub: user.id,
      roles: user.role,
    };
    return {
      access_token: this.jwtService.sign(payload, { secret: 'test' }),
      roles: user.roles,
    };
    // return {
    //   access_token: this.jwtService.sign(payload),
    // };
  }

  async decodeJWT(token: string) {
    return this.jwtService.decode(token);
  }
}
