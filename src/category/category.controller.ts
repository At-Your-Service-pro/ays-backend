import {  Body, Controller, Delete, Get, Param, Post, Put,UseGuards} from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/auth.guard';
import { CategoryService } from './category.service';
import { categoryDto } from './category.dto';

@Controller('category')
export class CategoryController {
    constructor (private readonly categoryService: CategoryService){}

    @UseGuards(JwtAuthGuard)
    @Post('create-category')
    async createCategory(@Body() createCategoryDto: categoryDto) {
        return this.categoryService.create(createCategoryDto);
    }

    @UseGuards(JwtAuthGuard)
    @Get('get-categories')
    async getAllCategories() {
        return this.categoryService.getAllCategories();
    }

    @UseGuards(JwtAuthGuard)
    @Get('get-category')
    async getCategory(@Param('id') id: number) {
        return this.categoryService.getCategory(id);
    }

}
