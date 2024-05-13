import { Module } from '@nestjs/common';
import { DescriptionsService } from './descriptions.service';
import { DescriptionsController } from './descriptions.controller';
import { AuthModule } from 'src/auth/auth.module';
import { JwtService } from '@nestjs/jwt';
import { ProductsService } from 'src/products/products.service';
import { UsersService } from 'src/users/users.service';
import { CategoriesService } from 'src/categories/categories.service';

@Module({
  imports: [AuthModule],
  controllers: [DescriptionsController],
  providers: [DescriptionsService, JwtService, ProductsService, UsersService, CategoriesService],
})
export class DescriptionsModule { }
