import { Controller, Get, Post, Body } from '@nestjs/common';

import { BannersService } from './banners.service';
import { CreateBannerDto } from './dto/create-banner.dto';
import { Auth, GetUser } from 'src/auth/decorators';
import { ValidRoles } from 'src/auth/interfaces';
import { User } from 'src/auth/entities/user.entity';

@Controller('banner')
export class BannersController {
  constructor(private readonly bannersService: BannersService) {}

  @Post()
  @Auth(ValidRoles.admin, ValidRoles.superUser)
  create(@GetUser() user: User, @Body() createBannerDto: CreateBannerDto) {
    return this.bannersService.create(user.id, createBannerDto);
  }

  @Get()
  findAll() {
    return this.bannersService.findAll();
  }
}
