import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { IPlace } from './interface/place.interface';
import { CreatePlaceDto } from './dto/create-place.dto';
import { IErrorResponse } from 'src/global.interface';

@Injectable()
export class PlacesService {
  constructor(private readonly prisma: PrismaService) {}

  async getPlaces(): Promise<IPlace[]> {
    return this.prisma.place.findMany();
  }

  async getPlaceById(id: string): Promise<IPlace | IErrorResponse> {
    const placeDB = await this.prisma.place.findUnique({
      where: { id },
    });

    if (!placeDB) {
      return { msg: 'Place not found', code: 'PS21' };
    }

    return placeDB;
  }

  async createPlace(
    createPlaceDto: CreatePlaceDto,
  ): Promise<IPlace | IErrorResponse> {
    const categoryDB = await this.prisma.category.findUnique({
      where: { id: createPlaceDto.category_id },
    });

    if (!categoryDB) {
      return { msg: 'Category not found', code: 'PS35' };
    }

    return this.prisma.place.create({
      data: createPlaceDto,
    });
  }

  async updatePlace(
    id: string,
    updatePlaceDto: CreatePlaceDto,
  ): Promise<IPlace | IErrorResponse> {
    const placeDB = await this.prisma.place.findUnique({
      where: { id },
    });

    if (!placeDB) {
      return { msg: 'Place not found', code: 'PS52' };
    }

    return this.prisma.place.update({
      where: { id },
      data: updatePlaceDto,
    });
  }

  async deletePlace(id: string): Promise<IPlace | IErrorResponse> {
    const placeDB = await this.prisma.place.findUnique({
      where: { id },
    });

    if (!placeDB) {
      return { msg: 'Place not found', code: 'PS52' };
    }

    return this.prisma.place.delete({
      where: { id },
    });
  }
}
