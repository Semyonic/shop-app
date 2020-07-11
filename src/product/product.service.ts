import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Product } from './product.entity';
import { DeleteResult, Repository } from 'typeorm';
import { ProductDto } from './product.dto';

@Injectable()
export class ProductService {
  constructor(@InjectRepository(Product) private repo: Repository<Product>) { }

  createOne(product: ProductDto): Promise<ProductDto> {
    return this.repo.save(product);
  }

  getAll(): Promise<ProductDto[]> {
    return this.repo.find();
  }

  getOne({ name }: ProductDto): Promise<ProductDto> {
    return this.repo.findOne({ where: { name } });
  }

  async updateOne(id: number, { price }: ProductDto): Promise<ProductDto> {
    const prod = await this.repo.findOne(id);
    return this.repo.save({ ...prod, price })
  }

  deleteOne({ name }: ProductDto): Promise<DeleteResult> {
    return this.repo.softDelete({ name });
  }
}
