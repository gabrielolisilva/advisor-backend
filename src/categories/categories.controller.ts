import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { CategoriesService } from './categories.service';
import { ICategory } from './interface/categories.interface';
import { IErrorResponse } from 'src/global.interface';
import { CreateCategoryDto } from './dto/create-categories.dto';

@Controller('categories')
export class CategoriesController {
  constructor(private readonly categoriesService: CategoriesService) {}

  @Get()
  getCategories(): Promise<ICategory[]> {
    return this.categoriesService.getCategories();
  }

  @Get(':id')
  getCategoryById(
    @Param('id') id: string,
  ): Promise<ICategory | IErrorResponse> {
    return this.categoriesService.getCategoryById(id);
  }

  @Post()
  createCategory(
    @Body() createCategoryDto: CreateCategoryDto,
  ): Promise<ICategory> {
    return this.categoriesService.createCategory(createCategoryDto);
  }

  @Put(':id')
  updateCategory(
    @Param('id') id: string,
    @Body() updateCategoryDto: CreateCategoryDto,
  ): Promise<ICategory | IErrorResponse> {
    return this.categoriesService.updateCategory(id, updateCategoryDto);
  }

  @Delete(':id')
  deleteCategory(@Param('id') id: string): Promise<ICategory | IErrorResponse> {
    return this.categoriesService.deleteCategory(id);
  }
}
