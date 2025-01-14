import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { IUser } from './interface/user.interface';
import { CreateUserDto } from './dto/create-user.dto';
import * as bcrypt from 'bcrypt';
import { IErrorResponse } from 'src/global.interface';

@Injectable()
export class UsersService {
  constructor(private readonly prisma: PrismaService) {}

  getUsers(): Promise<IUser[]> {
    return this.prisma.user.findMany();
  }

  async getUserById(id: string): Promise<IUser | IErrorResponse> {
    const user = await this.prisma.user.findUnique({
      where: { id },
    });

    if (!user) {
      return { msg: 'User not found', code: 'US22' };
    }

    return user;
  }

  async createUser(createUserDto: CreateUserDto): Promise<IUser> {
    createUserDto.password = await bcrypt.hash(createUserDto.password, 10);

    return this.prisma.user.create({
      data: createUserDto,
    });
  }

  async updateUser(
    id: string,
    updateUserDto: CreateUserDto,
  ): Promise<IUser | IErrorResponse> {
    const user = await this.prisma.user.findUnique({
      where: { id },
    });

    if (!user) {
      return { msg: 'User not found', code: 'US45' };
    }

    if (updateUserDto.password) {
      updateUserDto.password = await bcrypt.hash(updateUserDto.password, 10);
    }

    return this.prisma.user.update({
      where: { id },
      data: updateUserDto,
    });
  }

  async deleteUser(id: string): Promise<IUser | IErrorResponse> {
    const user = await this.prisma.user.delete({
      where: { id },
    });

    if (!user) {
      return { msg: 'User not found', code: 'US22' };
    }

    return user;
  }
}
