import { Controller, Get, Post, Body, Param } from '@nestjs/common';
import { ProductsService } from './products.service';
import { CreateReviewDto } from './dto/create-review.dto';

@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @Get(':id')
  findOneProduct(@Param('id') id: string) {
    return this.productsService.findOne(+id);
  }

  @Post(':id/review')
  create(@Param('id') id: string, @Body() createReviewDto: CreateReviewDto) {
    return this.productsService.createReview(+id, createReviewDto);
  }
}
