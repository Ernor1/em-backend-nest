import { Module } from '@nestjs/common';
import { CategoriesService } from './categories.service';
import { CategoriesController } from './categories.controller';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from 'src/users/users.service';

@Module({
  controllers: [CategoriesController],
  providers: [CategoriesService, JwtService, UsersService,],
})
export class CategoriesModule { }
