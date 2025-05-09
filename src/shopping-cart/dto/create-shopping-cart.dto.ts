import { IsInt, IsNotEmpty, IsNumber, IsPositive, IsString, isString } from "class-validator";
import { Column } from "typeorm";

export class CreateShoppingCartDto {
    @IsNumber()
    @IsPositive()
    totalPrice: number;
    
    @Column({ type: 'timestamp without time zone' })
    createdAt: Date;

    @Column({ type: 'timestamp without time zone' })
    updatedAt: Date;

    @IsString()
    @IsNotEmpty()
    userId: string;

    @Column('text', {
        array: true,
        default: []
    })
    productsId: number[];
}
