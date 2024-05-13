import { BadRequestException, Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { DatabaseService } from 'src/database/database.service';
import { CreateProductDto } from './dto/create-product.dto';
import { AssignCategoryDto } from './dto/assign-category.dto';
import { CategoriesService } from 'src/categories/categories.service';


@Injectable()
export class ProductsService {
  constructor(private readonly databaseService: DatabaseService, private readonly categoryService: CategoriesService) {

  }
  async create(createProductDto: CreateProductDto) {
    return this.databaseService.product.create({
      data:
      {
        name: createProductDto.name,
        price: createProductDto.price,
        availability: createProductDto.availability
      }
    });
  }

  async findAll() {
    return this.databaseService.product.findMany({
      include: {
        description: true,
        tags: true,
        reviews: true

      }
    });
  }

  async findOne(id: string) {
    return this.databaseService.product.findUnique({
      where: {
        id,
      },
      include: {
        description: true,
        tags: true,
        reviews: true

      }
    });
  }

  async update(id: string, updateProductDto: Prisma.ProductUpdateInput) {
    return this.databaseService.product.update({
      data:
      {
        name: updateProductDto.name,
        price: updateProductDto.price,
        availability: updateProductDto.availability
      },
      where: { id }
    });
  }
  async assignCategory(assignCategoryDto: AssignCategoryDto) {
    const { categoryId, productIds } = assignCategoryDto;
    try {
      await this.databaseService.$transaction(async () => {
        for (const productId of productIds) {
          try {
            const product = await this.findOne(productId);
            const category = await this.categoryService.findOne(categoryId);
            if (product && category) {
              if (!(product.categoryId === categoryId)) {
                await this.databaseService.product.update({
                  where: { id: productId },
                  data: {
                    category: {
                      connect: { id: categoryId }
                    }
                  }
                });
              }
            } else {
              throw new NotFoundException(`Product with id ${productId} or category with id ${categoryId} not found.`);
            }
          } catch (error) {
            if (error instanceof NotFoundException) {
              throw new NotFoundException(`Product with id ${productId} or category with id ${categoryId} not found.`);
            }
            throw error
          }
        }
      });
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw new NotFoundException(error.message);
      }
      throw new InternalServerErrorException(error.message);
    }
  }


  async remove(id: string) {
    return this.databaseService.product.delete({
      where: { id }
    });
  }
}
