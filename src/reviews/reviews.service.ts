import { Injectable, NotFoundException } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { DatabaseService } from 'src/database/database.service';
import { CreateReviewDto } from './dto/create-review.dto';
import { ProductsService } from 'src/products/products.service';
import { UpdateReviewDto } from './dto/update-review.dto';


@Injectable()
export class ReviewsService {
  constructor(private readonly dataBaseService: DatabaseService, private readonly productService: ProductsService) {

  }
  async create(createReviewDto: CreateReviewDto) {
    const product = await this.productService.findOne(createReviewDto.productId)
    if (!product)
      throw new NotFoundException("Product Not Found")
    return this.dataBaseService.review.create({
      data: {
        title: createReviewDto.title,
        content: createReviewDto.content,
        rating: createReviewDto.rating,
        product: {
          connect: { id: createReviewDto.productId }
        }
      }
    });
  }

  async findAll() {
    return this.dataBaseService.review.findMany({
      include: {
        product: true
      }
    });
  }

  async findOne(id: string) {
    return this.dataBaseService.review.findUnique({
      where: {
        id,
      },
      include: {
        product: true
      }
    });
  }

  async update(id: string, updateReviewDto: UpdateReviewDto) {
    return this.dataBaseService.review.update({
      data: {
        title: updateReviewDto.title,
        content: updateReviewDto.content,
        rating: updateReviewDto.rating,
        product: {
          connect: { id: updateReviewDto.productId }
        }
      },
      where: { id }
    });
  }

  async remove(id: string) {
    return this.dataBaseService.review.delete({
      where: { id }
    });
  }
}
