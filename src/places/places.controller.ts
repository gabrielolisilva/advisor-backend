import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { PlacesService } from './places.service';
import { IPlace } from './interface/place.interface';
import { CreatePlaceDto } from './dto/create-place.dto';
import { IErrorResponse } from 'src/global.interface';

@Controller('places')
export class PlacesController {
  constructor(private readonly placesService: PlacesService) {}

  @Get()
  getPlaces(): Promise<IPlace[]> {
    return this.placesService.getPlaces();
  }

  @Get(':id')
  getPlaceById(@Param('id') id: string): Promise<IPlace | IErrorResponse> {
    return this.placesService.getPlaceById(id);
  }

  @Post()
  createPlace(
    @Body() createPlaceDto: CreatePlaceDto,
  ): Promise<IPlace | IErrorResponse> {
    return this.placesService.createPlace(createPlaceDto);
  }

  @Put(':id')
  updatePlace(
    @Param('id') id: string,
    @Body() updatePlaceDto: CreatePlaceDto,
  ): Promise<IPlace | IErrorResponse> {
    return this.placesService.updatePlace(id, updatePlaceDto);
  }

  @Delete(':id')
  deletePlace(@Param('id') id: string): Promise<IPlace | IErrorResponse> {
    return this.placesService.deletePlace(id);
  }
}
