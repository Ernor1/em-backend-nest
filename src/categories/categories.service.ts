import { Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { DatabaseService } from 'src/database/database.service';


@Injectable()
export class CategoriesService {
  constructor(private readonly databaseService: DatabaseService) { }
  async create(createCategoryDto: CreateCategoryDto) {
    return this.databaseService.category.create({
      data: {
        name: createCategoryDto.name
      }
    })
  }

  async findAll() {
    return this.databaseService.category.findMany({})
  }

  async findOne(id: string) {
    return this, this.databaseService.category.findUnique({
      where: {
        id
      }
    });
  }

  async update(id: string, updateCategoryDto: UpdateCategoryDto) {
    if (!this.findOne(id))
      throw new NotFoundException("Category Not Found")
    return this.databaseService.category.update({
      where: {
        id
      },
      data: {
        name: updateCategoryDto.name
      }
    })
  }


  async remove(id: string) {
    return this.databaseService.category.delete({
      where: {
        id
      }
    });
  }
}
