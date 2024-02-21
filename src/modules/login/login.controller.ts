import { Body, Controller, Post } from '@nestjs/common';
import { LoginService } from './login.service';
import { LoginDto } from './dto/login.dto';
import { ApiTags } from '@nestjs/swagger';

@ApiTags("Login")
@Controller('login')
export class LoginController {
  constructor(private readonly loginService: LoginService) {}

  @Post("")
  async login(@Body() user: LoginDto) {
    return await this.loginService.login(user);
  }
}
