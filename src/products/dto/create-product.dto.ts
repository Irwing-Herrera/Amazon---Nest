import { IsInt, IsNotEmpty, IsNumber, IsOptional,IsPositive, IsString, MinLength } from 'class-validator';

export class CreateProductDto {

    @IsString()
    @MinLength(1)
    name: string;

    @IsNumber()
    @IsPositive()
    @IsNotEmpty()
    price: number;

    @IsString()
    @IsNotEmpty()
    description: string;

    @IsInt()
    @IsPositive()
    stock: number;

    @IsInt()
    @IsPositive()
    @IsNotEmpty()
    categoryId: number;
}