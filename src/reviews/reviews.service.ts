import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { IReview } from './interface/review.interface';
import { CreateReviewDto } from './dto/create-review.dto';
import { IErrorResponse } from 'src/global.interface';

@Injectable()
export class ReviewsService {
  constructor(private readonly prisma: PrismaService) {}

  async getReviews(): Promise<IReview[]> {
    return this.prisma.review.findMany();
  }

  async getReviewsByPlace(place_id: string): Promise<IReview[]> {
    return this.prisma.review.findMany({
      where: {
        place_id,
      },
      include: {
        user: true,
      },
    });
  }

  async getReviewsByUser(user_id: string): Promise<IReview[]> {
    return this.prisma.review.findMany({
      where: {
        user_id,
      },
    });
  }

  async createReview(
    review: CreateReviewDto,
  ): Promise<IReview | IErrorResponse> {
    const user = await this.prisma.user.findUnique({
      where: {
        id: review.user_id,
      },
    });

    if (!user) {
      return {
        msg: 'User not found',
        code: 'RS27',
      };
    }

    const place = await this.prisma.place.findUnique({
      where: {
        id: review.place_id,
      },
    });

    if (!place) {
      return {
        msg: 'Place not found',
        code: 'RS40',
      };
    }

    return this.prisma.review.create({
      data: review,
    });
  }

  async deleteReview(id: string): Promise<IReview | IErrorResponse> {
    const review = await this.prisma.review.findUnique({
      where: {
        id,
      },
    });

    if (!review) {
      return {
        msg: 'Review not found',
        code: 'RS78',
      };
    }

    return this.prisma.review.delete({
      where: {
        id,
      },
    });
  }
}
