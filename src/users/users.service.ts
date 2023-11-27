import {
  Injectable,
  UnprocessableEntityException,
  UnsupportedMediaTypeException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { CreateUserDto } from '../users/dto/create-user.dto';
import { HashService } from '../helper/hash.services';
import { PaginateQuery, paginate, Paginated } from 'nestjs-paginate';
import { UpdateUserDto } from './dto/update-user.dto';
import { PrismaService } from '../prisma.service';
import { User } from '@prisma/client';
@Injectable()
export class UsersService {
  constructor(
    private hashService: HashService,
    private prisma: PrismaService,
  ) {}
  async registerUser(createUserDto: CreateUserDto) {
    try {
      const hashPassword = await this.hashService.hashPassword(
        createUserDto.password,
      );
      await this.prisma.user.create({
        data: {
          email: createUserDto.email,
          fullName: createUserDto.fullName,
          password: hashPassword,
          role: ['user'],
        },
      });
      return 'user registred';
    } catch (err) {
      throw new UnprocessableEntityException('email must be unique');
    }
  }
  async findAll(): Promise<Partial<User[]>> {
    const result: Partial<any[]> = await this.prisma.user.findMany({
      select: {
        email: true,
        fullName: true,
        id: true,
        role: true,
      },
    });
    return result;
  }
}
