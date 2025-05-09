
import { IsNotEmpty, IsString, MinLength } from 'class-validator';

export class CreateBrandDto {
    @IsString()
    @IsNotEmpty()
    name: string;
}