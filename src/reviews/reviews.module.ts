import { Module } from '@nestjs/common';
import { ReviewsService } from './reviews.service';
import { ReviewsController } from './reviews.controller';
import { ProductsService } from 'src/products/products.service';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from 'src/users/users.service';
import { CategoriesService } from 'src/categories/categories.service';

@Module({
  controllers: [ReviewsController],
  providers: [ReviewsService, ProductsService, JwtService, UsersService, CategoriesService],
})
export class ReviewsModule { }
