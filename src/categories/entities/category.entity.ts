import { ApiProperty } from '@nestjs/swagger';
import { Product } from 'src/products/entities/product.entity';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Category {
    @PrimaryGeneratedColumn()
    id: number;

    @ApiProperty({ example: 1, description: 'The age of the Cat' })
    @Column('text', { unique: true })
    name: string;

    @OneToMany(() => Product, (product) => product.category)
    products: Product[];
}