import { ViewedProduct } from "src/products/entities/viewed-product.entity";
import { ShoppingCart } from "src/shopping-cart/entities/shopping-cart.entity";
import { BeforeInsert, BeforeUpdate, Column, Entity, OneToMany, OneToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity('users')
export class User {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column('text')
    firstName: string;

    @Column('text')
    lastName: string;

    @Column('text', { unique: true })
    email: string;

    @Column('text', { select: false })
    password: string;

    @Column('bool', { default: true })
    isActive: boolean;

    @Column('text', {
        array: true,
        default: ['user']
    })
    roles: string[];

    @OneToMany(() => ShoppingCart, (shoppingCart) => shoppingCart.user, { cascade: true })
    shoppingCarts: ShoppingCart[];

    // Productos visualizados por el usuario.
    @OneToMany(() => ViewedProduct, (viewedProduct) => viewedProduct.user, { cascade: true })
    viewedProducts: ViewedProduct[];

    @BeforeInsert()
    checkFieldsBeforeInsert() {
        this.email = this.email.toLowerCase().trim();
    }

    @BeforeUpdate()
    checkFieldsBeforeUpdate() {
        this.checkFieldsBeforeInsert();   
    }
}
