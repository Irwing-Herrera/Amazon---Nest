import { Category } from 'src/categories/entities/category.entity';
import { Column, CreateDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';

@Entity()
export class Product {

    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column('text', {
        unique: true,
    })
    name: string;
    @Column('text')
    description: string;
    @Column('decimal', { precision: 10, scale: 2 })
    price: number;
    @Column('int',{
        default: 0
    })
    quantity: number;
    @Column({ nullable: true })
    imageUrl?: string;
    @Column({ default: true })
    isActive: boolean;

   
    // Marca del producto
    @Column({ nullable: true })
    sku?: string;
     // Código de unidad de mantenimiento (SKU)
    @Column({ type: 'date', nullable: true })
    expirationDate?: Date;
     // Fecha de caducidad (si aplica)
    @Column({ nullable: true, type: 'text' })
    tags?: string; 
    // Etiquetas o palabras clave (en formato JSON o texto)
    @Column( 'decimal', { precision: 10, scale: 2, default: 0 })
    rating: number; // Calificación promedio del producto
    @Column( 'int',{ default: 0 })
    reviewCount: number; // Contador de reseñas
    @CreateDateColumn()
    createdAt: Date; // Fecha de creación
    @UpdateDateColumn()
    updatedAt: Date; // Fecha de última actualización

    @ManyToOne(() => Category, (category) => category.products, { eager: true })
    category: Category;
    // @Column()
    // brandId: string; 
    // TODO: CREAR DTO DE BRAND TABLA
}

