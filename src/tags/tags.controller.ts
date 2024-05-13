import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, ParseUUIDPipe } from '@nestjs/common';
import { TagsService } from './tags.service';
import { Prisma } from '@prisma/client';
import { AuthGuard } from 'src/guards/auth.guard';
import { CreateTagDto } from './dto/create-tag.dto';
import { UpdateTagDto } from './dto/update-tag.dto';
import { ApiBasicAuth, ApiBearerAuth, ApiParam, ApiTags } from '@nestjs/swagger';
import { Allow } from 'src/decorators/allow.decorator';
import { ApiResponse } from 'src/responses/api.response';


@Controller('tags')
@UseGuards(AuthGuard)
@ApiTags('Tags')
@ApiBearerAuth()
export class TagsController {
  constructor(private readonly tagsService: TagsService) { }

  @Post()
  async create(@Body() createTagDto: CreateTagDto) {
    return new ApiResponse(true, "Tag Created", await this.tagsService.create(createTagDto));
  }

  @Get()
  @Allow()
  async findAll() {
    return new ApiResponse(true, "All Tags", await this.tagsService.findAll());
  }

  @Get(':id')
  @ApiParam({ name: "id", type: String })
  @Allow()
  async findOne(@Param('id', ParseUUIDPipe) id: string) {
    return new ApiResponse(true, "Tag Retrieved", await this.tagsService.findOne(id));
  }

  @Patch(':id')
  @ApiParam({ name: "id", type: String })
  async update(@Param('id', ParseUUIDPipe) id: string, @Body() updateTagDto: UpdateTagDto) {
    return new ApiResponse(true, "Tag Updated", await this.tagsService.update(id, updateTagDto));
  }

  @Delete(':id')
  @ApiParam({ name: "id", type: String })
  async remove(@Param('id', ParseUUIDPipe) id: string) {
    return new ApiResponse(true, "Tag Deleted", await this.tagsService.remove(id));
  }
}
