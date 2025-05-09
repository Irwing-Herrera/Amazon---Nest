import { Type } from 'class-transformer';
import { IsBoolean, IsDate, isDate, IsInt, IsNotEmpty, IsNumber, IsOptional, IsPositive, IsString, MinLength } from 'class-validator';
import { Column } from 'typeorm';

export class CreateProductDto {

    @IsString()
    @MinLength(1)
    name: string;

    @IsString()
    @IsNotEmpty()
    description: string;

    @IsNumber()
    @IsPositive()
    price: number;

    @IsInt()
    @IsPositive()
    quantity: number;

    @IsString()
    @IsOptional()
    imageUrl: string;

    @IsBoolean()
    isActive: boolean;

    @IsOptional()
    @IsDate()
    @Type(() => Date)
    expirationDate: Date;

    @IsString()
    @MinLength(1)
    tags: string;

    @IsNumber()
    @IsPositive()
    @IsNotEmpty()
    rating: number;

    @IsNumber()
    @IsPositive()
    @IsNotEmpty()
    reviewCount: number;

    @Column({ type: 'timestamp without time zone' })
    createdAt: Date;

    @Column({ type: 'timestamp without time zone' })
    updatedAt: Date;

    @IsInt()
    @IsPositive()
    @IsNotEmpty()
    categoryId: number;

    @IsInt()
    @IsPositive()
    @IsNotEmpty()
    brandId: number;
}