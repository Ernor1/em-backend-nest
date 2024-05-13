import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, ParseUUIDPipe } from '@nestjs/common';
import { CategoriesService } from './categories.service';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { ApiBearerAuth, ApiParam, ApiTags } from '@nestjs/swagger';
import { AuthGuard } from 'src/guards/auth.guard';
import { Roles } from 'src/decorators/roles.decorator';
import { Role_Enum } from 'src/enums/role.enum';
import { ApiResponse } from 'src/responses/api.response';
import { Allow } from 'src/decorators/allow.decorator';


@Controller('categories')
@ApiTags('Categories')
@UseGuards(AuthGuard)
@ApiBearerAuth()
export class CategoriesController {
  constructor(private readonly categoriesService: CategoriesService) { }

  @Post()
  @Roles(Role_Enum.ADMIN)
  async create(@Body() createCategoryDto: CreateCategoryDto) {
    return new ApiResponse(true, "Category Created Successfully", await this.categoriesService.create(createCategoryDto));
  }
  @Allow()
  @Get()
  async findAll() {
    return new ApiResponse(true, "All categories", await this.categoriesService.findAll());
  }
  @Allow()
  @Get(':id')
  @ApiParam({ name: "id", type: String })
  async findOne(@Param('id', ParseUUIDPipe) id: string) {
    return new ApiResponse(true, "Retrieved Category", await this.categoriesService.findOne(id));
  }

  @Patch(':id')
  @ApiParam({ name: "id", type: String })
  @Roles(Role_Enum.ADMIN)
  async update(@Param('id', ParseUUIDPipe) id: string, @Body() updateCategoryDto: UpdateCategoryDto) {
    return new ApiResponse(true, "Updated Category", await this.categoriesService.update(id, updateCategoryDto));
  }

  @Delete(':id')
  @ApiParam({ name: "id", type: String })
  @Roles(Role_Enum.ADMIN)
  async remove(@Param('id', ParseUUIDPipe) id: string) {
    return new ApiResponse(true, "Deleted Category", await this.categoriesService.remove(id));
  }
}
