import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { CategoriesModule } from './categories/categories.module';
import { PlacesModule } from './places/places.module';
import { ReviewsModule } from './reviews/reviews.module';

@Module({
  imports: [UsersModule, CategoriesModule, PlacesModule, ReviewsModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
