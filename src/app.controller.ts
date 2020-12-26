import {
  Controller,
  Request,
  Post,
  UseGuards,
  ValidationPipe,
  Body,
  Get,
} from '@nestjs/common';
import { LocalAuthGuard } from './auth/local-auth.guard';
import { AuthService } from './auth/auth.service';
import { RegisterDTO } from './users/dto/register.dto';
import { AppService } from './app.service';
import { Public } from './auth/public';

@Controller()
export class AppController {
  constructor(
    private authService: AuthService,
    private appService: AppService,
  ) {}

  @Public()
  @UseGuards(LocalAuthGuard)
  @Post('auth/login')
  async login(@Request() req) {
    return this.authService.login(req.user);
  }

  @Public()
  @Post('auth/register')
  async register(@Body(ValidationPipe) credentials: RegisterDTO) {
    return this.authService.register(credentials);
  }

  @Public()
  @Get()
  getHello(): string {
    return this.appService.getHello();
  }
}
