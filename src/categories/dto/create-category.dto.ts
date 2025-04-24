import { IsNotEmpty, IsString, MinLength } from 'class-validator';

export class CreateCategoryDto {
    @IsString()
    @IsNotEmpty()
    name: string;
}