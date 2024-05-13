import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, ParseUUIDPipe } from '@nestjs/common';
import { ReviewsService } from './reviews.service';
import { Prisma } from '@prisma/client';
import { CreateReviewDto } from './dto/create-review.dto';
import { UpdateReviewDto } from './dto/update-review.dto';
import { AuthGuard } from 'src/guards/auth.guard';
import { ApiBearerAuth, ApiParam, ApiTags } from '@nestjs/swagger';
import { Allow } from 'src/decorators/allow.decorator';
import { ApiResponse } from 'src/responses/api.response';


@Controller('reviews')
@UseGuards(AuthGuard)
@Allow()
@ApiBearerAuth()
@ApiTags('Reviews')
export class ReviewsController {
  constructor(private readonly reviewsService: ReviewsService) { }

  @Post()
  async create(@Body() createReviewDto: CreateReviewDto) {
    return new ApiResponse(true, "Created Review", await this.reviewsService.create(createReviewDto));
  }

  @Get()
  async findAll() {
    return new ApiResponse(true, "All Reviews", await this.reviewsService.findAll());
  }

  @Get(':id')
  @ApiParam({ name: "id", type: String })
  async findOne(@Param('id', ParseUUIDPipe) id: string) {
    return new ApiResponse(true, "Review Retrieved", await this.reviewsService.findOne(id));
  }

  @Patch(':id')
  @ApiParam({ name: "id", type: String })
  async update(@Param('id', ParseUUIDPipe) id: string, @Body() updateReviewDto: UpdateReviewDto) {
    return new ApiResponse(true, "Updated Review", await this.reviewsService.update(id, updateReviewDto));
  }

  @Delete(':id')
  @ApiParam({ name: "id", type: String })
  async remove(@Param('id', ParseUUIDPipe) id: string) {
    return new ApiResponse(true, "Review Deleted", await this.reviewsService.remove(id));
  }
}
