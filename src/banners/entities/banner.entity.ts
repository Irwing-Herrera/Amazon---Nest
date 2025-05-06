import { Column, Entity, ManyToOne, OneToOne, PrimaryGeneratedColumn } from 'typeorm';

import { Category } from 'src/categories/entities/category.entity';

@Entity()
export class Banner {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column('text', { unique: true })
    name: string;

    @Column('text', { unique: true })
    imageUrl: string;

    @ManyToOne(() => Category, (category) => category.banners, { eager: true })
    category: Category;
}