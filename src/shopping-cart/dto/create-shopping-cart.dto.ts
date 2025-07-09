import { IsNotEmpty } from "class-validator";

export class CreateShoppingCartDto {
    @IsNotEmpty()
    product: {
        productId: string,
        quantity: number
    };
}
