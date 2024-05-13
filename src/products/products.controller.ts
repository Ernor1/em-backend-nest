import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Put, ParseUUIDPipe, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { ProductsService } from './products.service';
import { Prisma } from '@prisma/client';
import { AuthGuard } from 'src/guards/auth.guard';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { ApiBearerAuth, ApiParam, ApiTags } from '@nestjs/swagger';
import { Allow } from 'class-validator';
import { ApiResponse } from 'src/responses/api.response';
import { AssignCategoryDto } from './dto/assign-category.dto';
@UseGuards(AuthGuard)
@Controller('products')
@ApiBearerAuth()
@ApiTags('Products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) { }

  @Post()
  async create(@Body() createProductDto: CreateProductDto) {
    return new ApiResponse(true, "Created Product", await this.productsService.create(createProductDto));
  }

  @Get()
  @Allow()
  async findAll() {
    return new ApiResponse(true, "All Products", await this.productsService.findAll());
  }

  @Get(':id')
  @ApiParam({ name: "id", type: String })
  @Allow()
  async findOne(@Param('id', ParseUUIDPipe) id: string) {
    return new ApiResponse(true, "Retrieved Product", await this.productsService.findOne(id));
  }

  @Patch(':id')
  @ApiParam({ name: "id", type: String })
  async update(@Param('id', ParseUUIDPipe) id: string, @Body() updateProductDto: UpdateProductDto) {
    return new ApiResponse(true, "Updated Product", await this.productsService.update(id, updateProductDto));
  }
  @Put('/assign-category')
  async assignCategory(@Body() assignCategoryDto: AssignCategoryDto) {
    try {
      await this.productsService.assignCategory(assignCategoryDto);
      return new ApiResponse(true, 'Assigned Category to Product', []);
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw new NotFoundException(error.message);
      }
      throw error
    }
  }

  @Delete(':id')
  @ApiParam({ name: "id", type: String })
  async remove(@Param('id', ParseUUIDPipe) id: string) {
    return new ApiResponse(true, "Deleted Product", await this.productsService.remove(id));
  }
}
