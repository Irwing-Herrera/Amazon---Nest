import { IsInt, IsNotEmpty, IsPositive, IsString } from "class-validator";

export class CreateBannerDto {
    @IsString()
    @IsNotEmpty()
    name: string;

    @IsString()
    @IsNotEmpty()
    imageUrl: string;

    @IsInt()
    @IsPositive()
    @IsNotEmpty()
    categoryId: number;
}
