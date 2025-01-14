import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';
import { IErrorResponse } from 'src/global.interface';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  login(
    @Body() loginDto: LoginDto,
  ): Promise<{ access_token: string } | IErrorResponse> {
    return this.authService.login(loginDto);
  }
}
