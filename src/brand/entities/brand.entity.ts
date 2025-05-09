
import { Column, Entity, OneToMany, OneToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Product } from 'src/products/entities/product.entity';

@Entity()
export class Brand {
    @PrimaryGeneratedColumn()
    id: number;

    @Column('text', { unique: true })
    name: string;

    @OneToMany(() => Product, (product) => product.brand)
    products: Product[];
}