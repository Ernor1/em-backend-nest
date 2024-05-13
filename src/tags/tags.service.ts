import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { DatabaseService } from 'src/database/database.service';
import { CreateTagDto } from './dto/create-tag.dto';


@Injectable()
export class TagsService {
  constructor(private readonly databaseService: DatabaseService) {

  }
  async create(createTagDto: CreateTagDto) {
    return this.databaseService.tag.create({
      data: {
        content: createTagDto.content
      }
    });
  }

  async findAll() {
    return this.databaseService.tag.findMany({
      include: {
        products: true
      }
    });
  }

  async findOne(id: string) {
    return this.databaseService.tag.findUnique({
      where: {
        id,
      },
      include: {
        products: true

      }
    });
  }

  async update(id: string, updateTagDto: Prisma.TagUpdateInput) {
    return this.databaseService.tag.update({
      data: updateTagDto,
      where: { id }
    });
  }

  async remove(id: string) {
    return this.databaseService.tag.delete({
      where: { id }
    });
  }
}
