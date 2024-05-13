import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, ParseUUIDPipe } from '@nestjs/common';
import { DescriptionsService } from './descriptions.service';
import { Prisma } from '@prisma/client';

import { AuthGuard } from 'src/guards/auth.guard';
import { CreateDescriptionDto } from './dto/create-description.dto';
import { UpdateDescriptionDto } from './dto/update-description.dto';
import { ApiBearerAuth, ApiParam, ApiTags } from '@nestjs/swagger';
import { Allow } from 'class-validator';
import { ApiResponse } from 'src/responses/api.response';
@UseGuards(AuthGuard)
@Controller('descriptions')
@ApiBearerAuth()
@ApiTags('Descriptions')
export class DescriptionsController {
  constructor(private readonly descriptionsService: DescriptionsService) { }

  @Post()
  async create(@Body() createDescriptionDto: CreateDescriptionDto) {
    return new ApiResponse(true, "Created Description", await this.descriptionsService.create(createDescriptionDto));
  }

  @Get()
  @Allow()
  async findAll() {
    return new ApiResponse(true, "All Descriptions", await this.descriptionsService.findAll());
  }

  @Get(':id')
  @ApiParam({ name: "id", type: String })
  @Allow()
  async findOne(@Param('id', ParseUUIDPipe) id: string) {
    return new ApiResponse(true, "Description retrieved", await this.descriptionsService.findOne(id));
  }

  @Patch(':id')
  @ApiParam({ name: "id", type: String })
  async update(@Param('id', ParseUUIDPipe) id: string, @Body() updateDescriptionDto: UpdateDescriptionDto) {
    return new ApiResponse(true, "Updated Description", await this.descriptionsService.update(id, updateDescriptionDto));
  }

  @Delete(':id')
  @ApiParam({ name: "id", type: String })
  async remove(@Param('id', ParseUUIDPipe) id: string) {
    return new ApiResponse(true, "Deleted Description", await this.descriptionsService.remove(id));
  }
}
