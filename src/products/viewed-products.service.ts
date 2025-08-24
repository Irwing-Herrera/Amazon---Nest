import { BadRequestException, Injectable, InternalServerErrorException, Logger } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";

import { Product } from "./entities/product.entity";
import { User } from "src/auth/entities/user.entity";
import { ViewedProduct } from 'src/products/entities/viewed-product.entity';

@Injectable()
export class ViewedProductService {

    private readonly logger = new Logger('ViewedProductService');

    constructor(
        @InjectRepository(ViewedProduct)
        private readonly viewedProductRepository: Repository<ViewedProduct>
    ) { }

    // Public Methods
    async addRecord(product: Product, user: User) {
        try {
            const history = await this.viewedProductRepository.find({
                where: { user: { id: user.id } },
                order: { viewedAt: 'ASC' },
            });

            if (history.length >= 10) {
                const oldestRecord = history[0];
                await this.viewedProductRepository.delete(oldestRecord.id);
            }

            this.viewedProductRepository.save({
                product,
                user: user,
                viewedAt: new Date()
            });
        } catch (error) {
            this.handleDBExceptions(error);
        }
    }

    // Private Methods

    private handleDBExceptions(error: any) {
        if (error.code === '23505') {
            throw new BadRequestException(error.detail);
        }

        this.logger.error(error)
        throw new InternalServerErrorException('Unexpected error, check server logs');
    }
}