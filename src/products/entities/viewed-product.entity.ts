import { User } from 'src/auth/entities/user.entity';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Product } from './product.entity';

@Entity('viewed_products')
export class ViewedProduct {
    @PrimaryGeneratedColumn()
    id: number;

    // Usuario que visualizó el producto.
    @ManyToOne(() => User, user => user.viewedProducts, { onDelete: 'CASCADE' })
    user: User;

    // Producto que fue visualizado.
    @ManyToOne(() => Product, product => product.viewedBy, { onDelete: 'CASCADE' })
    product: Product;

    // Fecha y hora en que el producto fue visualizado.
    @Column()
    viewedAt: Date;
}