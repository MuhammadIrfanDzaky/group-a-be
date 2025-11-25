import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateReviewDto } from './dto/create-review.dto';

@Injectable()
export class ProductsService {
  constructor(private prisma: PrismaService) {}

  // Get all products with reviews
  async findAll() {
    return await this.prisma.products.findMany({
      include: {
        reviews: true, // fetch all related reviews
      },
      orderBy: {
        id: 'asc',
      },
    });
  }

  // Get one product by id with reviews
  async findOne(id: number) {
    const product = await this.prisma.products.findUnique({
      where: { id },
      include: {
        reviews: true,
      },
    });

    if (!product) {
      throw new NotFoundException(`Product with ID ${id} not found`);
    }

    return {
      id: 1,
      title: product.title,
      image: product.image_url,
      review: product.reviews[0],
      total: product.reviews.length,
    };
  }

  async createReview(productId: number, createReviewDto: CreateReviewDto) {
    // Check if product exists
    const product = await this.prisma.products.findUnique({
      where: { id: productId },
    });

    if (!product) {
      throw new NotFoundException(`Product with ID ${productId} not found`);
    }

    // Create the review
    return this.prisma.reviews.create({
      data: {
        product_id: productId,
        reviewer_name: createReviewDto.reviewer_name,
        review_text: createReviewDto.review_text,
      },
    });
  }
}
