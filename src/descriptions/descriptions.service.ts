import { Injectable, NotFoundException } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { DatabaseService } from 'src/database/database.service';
import { CreateDescriptionDto } from './dto/create-description.dto';
import { ProductsService } from 'src/products/products.service';
import { UpdateDescriptionDto } from './dto/update-description.dto';


@Injectable()
export class DescriptionsService {
  constructor(private readonly dataBaseService: DatabaseService, private readonly productService: ProductsService) {

  }
  async create(createDescriptionDto: CreateDescriptionDto) {
    const product = await this.productService.findOne(createDescriptionDto.productId)
    if (!product)
      throw new NotFoundException("Product Not Found")
    return this.dataBaseService.description.create({
      data: {
        content: createDescriptionDto.content,
        product: {
          connect: { id: createDescriptionDto.productId }
        }
      }
    });
  }

  async findAll() {
    return this.dataBaseService.description.findMany({
      include: {
        product: true
      }
    });
  }

  async findOne(id: string) {
    return this.dataBaseService.description.findUnique({
      where: {
        id,
      }
    });
  }

  async update(id: string, updateDescriptionDto: UpdateDescriptionDto) {
    const product = await this.productService.findOne(updateDescriptionDto.productId)
    if (!product)
      throw new NotFoundException("Product Not Found")
    return this.dataBaseService.description.update({
      where: {
        id
      },
      data: {
        content: updateDescriptionDto.content,
        product: {
          connect: { id: updateDescriptionDto.productId }
        }
      }
    });
  }

  async remove(id: string) {
    return this.dataBaseService.description.delete({
      where: {
        id
      }
    });
  }
}
