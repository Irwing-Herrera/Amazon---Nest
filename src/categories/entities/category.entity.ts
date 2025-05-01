import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

import { Product } from 'src/products/entities/product.entity';

@Entity()
export class Category {
    @PrimaryGeneratedColumn()
    id: number;

    @Column('text', { unique: true })
    name: string;

    @OneToMany(() => Product, (product) => product.category)
    products: Product[];
}