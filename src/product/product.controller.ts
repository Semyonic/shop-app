import { Body, Controller, Get, HttpException, HttpStatus, Param, Patch, Post } from '@nestjs/common';
import { ProductService } from './product.service';
import { ProductDto } from './product.dto';

@Controller('product')
export class ProductController {
  constructor(private readonly service: ProductService) { }

  @Get()
  allProducts() {
    try {
      return this.service.getAll();
    } catch (error) {
      throw new HttpException(error, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @Post()
  createProduct(@Body() body: ProductDto): Promise<ProductDto> {
    try {
      return this.service.createOne(body);
    } catch (error) {
      throw new HttpException(error, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @Patch(':id')
  updateProduct(@Param() id: number,@Body() body: ProductDto): Promise<ProductDto> {
    try {
      return this.service.updateOne(id, body);
    } catch (error) {
      throw new HttpException(error, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
}
