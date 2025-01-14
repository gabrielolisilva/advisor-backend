import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { IUser } from './interface/user.interface';
import { CreateUserDto } from './dto/create-user.dto';
import { IErrorResponse } from 'src/global.interface';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get()
  getUsers(): Promise<IUser[]> {
    return this.usersService.getUsers();
  }

  @Get(':id')
  getUserById(@Param('id') id: string): Promise<IUser | IErrorResponse> {
    return this.usersService.getUserById(id);
  }

  @Post()
  createUser(@Body() createUserDto: CreateUserDto): Promise<IUser> {
    return this.usersService.createUser(createUserDto);
  }

  @Put(':id')
  updateUser(
    @Param('id') id: string,
    @Body() updateUserDto: CreateUserDto,
  ): Promise<IUser | IErrorResponse> {
    return this.usersService.updateUser(id, updateUserDto);
  }

  @Delete(':id')
  deleteUser(@Param('id') id: string): Promise<IUser | IErrorResponse> {
    return this.usersService.deleteUser(id);
  }
}
