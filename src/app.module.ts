import { Module } from '@nestjs/common'
import { AppController } from './app.controller'
import { AppService } from './app.service'
import { DatabaseModule } from './database/database.module'
import { ProductsModule } from './products/products.module';
import { UsersModule } from './users/users.module';
import { DescriptionsModule } from './descriptions/descriptions.module';
import { ReviewsModule } from './reviews/reviews.module';
import { TagsModule } from './tags/tags.module';
import { CategoriesModule } from './categories/categories.module';
import { AuthModule } from './auth/auth.module';
import { ConfigModule } from '@nestjs/config';
import { RolesModule } from './roles/roles.module';
import { APP_FILTER, APP_GUARD } from '@nestjs/core';
import { RolesGuard } from './guards/roles.guard';
import { AuthGuard } from './guards/auth.guard';
import { AppExceptionFilter } from './filter/exception.filter';

@Module({
  imports: [ConfigModule.forRoot(), DatabaseModule, ProductsModule, UsersModule, DescriptionsModule, ReviewsModule, TagsModule, CategoriesModule, AuthModule, RolesModule],
  controllers: [AppController],
  providers: [AppService, {
    provide: APP_GUARD,
    useClass: AuthGuard,
  }, {
      provide: APP_GUARD,
      useClass: RolesGuard
    }, {
      provide: APP_FILTER,
      useClass: AppExceptionFilter
    }],
})
export class AppModule { }
