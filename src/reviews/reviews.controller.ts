import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { ReviewsService } from './reviews.service';
import { IReview } from './interface/review.interface';
import { CreateReviewDto } from './dto/create-review.dto';
import { IErrorResponse } from 'src/global.interface';

@Controller('reviews')
export class ReviewsController {
  constructor(private readonly reviewsService: ReviewsService) {}

  @Get()
  getReviews(): Promise<IReview[]> {
    return this.reviewsService.getReviews();
  }

  @Get('/by-place/:place_id')
  getReviewsByPlace(@Param('place_id') place_id: string): Promise<IReview[]> {
    return this.reviewsService.getReviewsByPlace(place_id);
  }

  @Get('/by-user/:user_id')
  getReviewsByUser(@Param('user_id') user_id: string): Promise<IReview[]> {
    return this.reviewsService.getReviewsByUser(user_id);
  }

  @Post()
  createReview(
    @Body() review: CreateReviewDto,
  ): Promise<IReview | IErrorResponse> {
    return this.reviewsService.createReview(review);
  }

  @Delete(':id')
  deleteReview(@Param('id') id: string): Promise<IReview | IErrorResponse> {
    return this.reviewsService.deleteReview(id);
  }
}
