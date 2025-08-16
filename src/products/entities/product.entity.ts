import { Category } from 'src/categories/entities/category.entity';
import { Brand } from 'src/brand/entities/brand.entity';
import { Column, CreateDateColumn, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';
import { ShoppingCart } from 'src/shopping-cart/entities/shopping-cart.entity';
import { ShoppingCartProduct } from './shopping-cart-product.entity';

@Entity()
export class Product {

    // Identificador único del producto.
    @PrimaryGeneratedColumn('uuid')
    id: string;

    // Nombre del producto.
    @Column('text', { unique: true })
    name: string;

    // Descripción del producto.
    @Column('text')
    description: string;

    // Precio del producto.
    @Column({ type: "decimal", precision: 10, scale: 2 })
    price: number;

    // Cantidad disponible del producto.
    @Column('int', { default: 0 })
    quantity: number;

    // URL de la imagen del producto, puede ser un array para múltiples imágenes.
    @Column({ type: 'text', array: true, nullable: true })
    imageUrl: string[];

    // Indica si el producto está activo o no.
    @Column({ default: true })
    isActive: boolean;

    // SKU (Stock Keeping Unit) del producto, opcional.
    @Column({ nullable: true })
    sku?: string;

    // Fecha de expiración del producto, opcional.
    @Column({ type: 'date', nullable: true })
    expirationDate?: Date;

    // Etiquetas del producto, opcional.
    @Column({ nullable: true, type: 'text' })
    tags?: string;

    // Calificación del producto.
    @Column('decimal', { precision: 10, scale: 2, default: 0 })
    rating: number;

    // Descuento aplicado al producto, en porcentaje.
    @Column('int', { default: 0 })
    discount: number;

    // Cantidad de reseñas del producto.
    @Column('int', { default: 0 })
    reviewCount: number;

    // Fecha de creación del producto.
    @CreateDateColumn()
    createdAt: Date;

    // Fecha de actualización del producto.
    @UpdateDateColumn()
    updatedAt: Date;

    // Asociación con la categoría del producto.
    @ManyToOne(() => Category, (category) => category.products, { eager: true })
    category: Category;

    // Asociación con la marca del producto.
    @ManyToOne(() => Brand, (brand) => brand.products, { eager: true })
    brand: Brand;

    // Esto permite consultar desde el producto en qué carritos ha sido incluido y facilita las relaciones bidireccionales.
    @OneToMany(() => ShoppingCartProduct, (scp) => scp.product)
    shoppingCartProducts: ShoppingCartProduct[];
}

