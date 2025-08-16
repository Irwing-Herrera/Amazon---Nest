import { IsNotEmpty } from "class-validator";

export class CreateShoppingCartDto {
    @IsNotEmpty()
    products: {
        productId: string,
        quantity: number,
        purchasePrice: number
    }[];
}
