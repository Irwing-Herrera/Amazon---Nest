import { IsInt, IsNotEmpty, IsNumber, IsPositive, IsString, isString } from "class-validator";

export class CreateShoppingCartDto {
    @IsString()
    @IsNotEmpty()
    userId: string;

    @IsNotEmpty()
    product: {
        productId: string,
        quantity: number
    };
}
