import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';

@Injectable()
export class ProductsService {
  constructor(private prisma: PrismaService) {}

  // Create product
  async create(createProductDto: CreateProductDto) {
    return await this.prisma.products.create({
      data: {
        title: createProductDto.title,
        image_url: createProductDto.image_url,
      },
    });
  }

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

    return product;
  }

  update(id: number, updateProductDto: UpdateProductDto) {
    return `This action updates a #${id} product`;
  }

  remove(id: number) {
    return `This action removes a #${id} product`;
  }
}
