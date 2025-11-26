import { Controller, Get, Post, Body, Param } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiParam, ApiBody } from '@nestjs/swagger';
import { ProductsService } from './products.service';
import { CreateReviewDto } from './dto/create-review.dto';

@ApiTags('products')
@Controller('api/products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @Get(':id')
  @ApiOperation({ summary: 'Get a product by ID' })
  @ApiParam({ name: 'id', description: 'Product ID', type: 'string' })
  @ApiResponse({ status: 200, description: 'Product found' })
  @ApiResponse({ status: 404, description: 'Product not found' })
  findOneProduct(@Param('id') id: string) {
    return this.productsService.findOne(+id);
  }

  @Post(':id/review')
  @ApiOperation({ summary: 'Create a review for a product' })
  @ApiParam({ name: 'id', description: 'Product ID', type: 'string' })
  @ApiBody({ type: CreateReviewDto })
  @ApiResponse({ status: 201, description: 'Review created successfully' })
  @ApiResponse({ status: 404, description: 'Product not found' })
  @ApiResponse({ status: 400, description: 'Invalid input' })
  create(@Param('id') id: string, @Body() createReviewDto: CreateReviewDto) {
    return this.productsService.createReview(+id, createReviewDto);
  }
}
