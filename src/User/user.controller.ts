import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Post,
  Request,
  UseGuards,
} from '@nestjs/common';
import { UserDto } from './user.dto';
import { UserService } from './user.service';
import { Public } from 'src/util/Setmetadata';
import { AuthGuard } from './User.guard';

@Controller('user')
export class UserController {
  constructor(private readonly UserServices: UserService) {}

  @Post('/create')
  async create(@Body() data: UserDto) {
    return this.UserServices.create(data);
  }
  @Public()
  @HttpCode(HttpStatus.OK)
  @Post('/login')
  login(@Body() sigin: Record<string, any>) {
    return this.UserServices.signin(sigin.nome, sigin.password);
  }
  @UseGuards(AuthGuard)
  @Get('profile')
  async profile(@Request() req) {
    return req.user;
  }

  @Get()
  async get() {
    return this.UserServices.findAll();
  }
}
