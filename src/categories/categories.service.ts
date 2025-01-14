import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { ICategory } from './interface/category.interface';
import { IErrorResponse } from 'src/global.interface';
import { CreateCategoryDto } from './dto/create-category.dto';

@Injectable()
export class CategoriesService {
  constructor(private readonly prisma: PrismaService) {}

  async getCategories(): Promise<ICategory[]> {
    return this.prisma.category.findMany();
  }

  async getCategoryById(id: string): Promise<ICategory | IErrorResponse> {
    const category = await this.prisma.category.findUnique({
      where: { id },
    });

    if (!category) {
      return { msg: 'Category not found', code: 'CS19' };
    }

    return category;
  }

  async createCategory(
    createCategoryDto: CreateCategoryDto,
  ): Promise<ICategory> {
    return this.prisma.category.create({
      data: createCategoryDto,
    });
  }

  async updateCategory(
    id: string,
    updateCategoryDto: CreateCategoryDto,
  ): Promise<ICategory | IErrorResponse> {
    const category = await this.prisma.category.findUnique({
      where: { id },
    });

    if (!category) {
      return { msg: 'Category not found', code: 'CS44' };
    }

    return this.prisma.category.update({
      where: { id },
      data: updateCategoryDto,
    });
  }

  async deleteCategory(id: string): Promise<ICategory | IErrorResponse> {
    const category = await this.prisma.category.findUnique({
      where: { id },
    });

    if (!category) {
      return { msg: 'Category not found', code: 'CS59' };
    }

    return this.prisma.category.delete({
      where: { id },
    });
  }
}
