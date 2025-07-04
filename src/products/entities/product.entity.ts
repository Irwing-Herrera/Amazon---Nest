import { Category } from 'src/categories/entities/category.entity';
import { Brand } from 'src/brand/entities/brand.entity';
import { Column, CreateDateColumn, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';
import { ShoppingCart } from 'src/shopping-cart/entities/shopping-cart.entity';

@Entity()
export class Product {

    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column('text', { unique: true })
    name: string;

    @Column('text')
    description: string;

    @Column({ type: "decimal", precision: 10, scale: 2 })
    price: number;

    @Column('int', { default: 0 })
    quantity: number;

    @Column({ nullable: true })
    imageUrl?: string;

    @Column({ default: true })
    isActive: boolean;

    @Column({ nullable: true })
    sku?: string;

    @Column({ type: 'date', nullable: true })
    expirationDate?: Date;

    @Column({ nullable: true, type: 'text' })
    tags?: string;

    @Column('decimal', { precision: 10, scale: 2, default: 0 })
    rating: number;

    @Column('int', { default: 0 })
    discount: number;

    @Column('int', { default: 0 })
    reviewCount: number;

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;

    @ManyToOne(() => Category, (category) => category.products, { eager: true })
    category: Category;

    @ManyToOne(() => Brand, (brand) => brand.products, { eager: true })
    brand: Brand;

    @OneToMany(() => ShoppingCart, (shoppingCart) => shoppingCart.product, { eager: true })
    shoppingCartProducts: ShoppingCart[];
}

