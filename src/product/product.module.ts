import { Module } from '@nestjs/common';
import { ProductService } from './product.service';
import { ProductController } from './product.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Product } from './product.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([ Product ]),
  ],
  providers: [ ProductService ],
  controllers: [ ProductController ],
})
export class ProductModule { }
