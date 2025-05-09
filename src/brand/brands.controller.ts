import { Controller, Post, Body, Get } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { ValidRoles } from 'src/auth/interfaces';
import { Auth } from 'src/auth/decorators';
import { BrandService } from './brand.service';
import { CreateBrandDto } from './dto/create-brand.dto';


@ApiTags('Brand')
@Controller('brand')
export class BrandController{
    constructor(private readonly brandService:BrandService){}

    @Post()
    @Auth(ValidRoles.admin, ValidRoles.superUser)
    create(@Body() createBrandDto:CreateBrandDto){
        return this.brandService.create(createBrandDto);
    }

    @Get()
    @Auth(ValidRoles.user)
    findAll(){
        return this.brandService.findAll();
    }
}
