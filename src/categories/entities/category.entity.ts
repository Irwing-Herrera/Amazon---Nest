import { Column, Entity, OneToMany, OneToOne, PrimaryGeneratedColumn } from 'typeorm';

import { Product } from 'src/products/entities/product.entity';
import { Banner } from 'src/banners/entities/banner.entity';

@Entity()
export class Category {
    @PrimaryGeneratedColumn()
    id: number;

    @Column('text', { unique: true })
    name: string;

    @OneToMany(() => Product, (product) => product.category)
    products: Product[];

    @OneToMany(() => Banner, (banner) => banner.category)
    banners: Banner[];
}