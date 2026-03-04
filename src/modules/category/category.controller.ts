import { Controller, Get } from '@nestjs/common';
import { CategoryService } from '@modules/category/category.service';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';
import { CategoryResDto } from '@modules/category/dto/res/category-res.dto';
import {
  GET_CATEGORIES,
  GET_CATEGORIES_RES,
} from '@modules/category/constants/swagger.constants';

@Controller('category')
export class CategoryController {
  constructor(private readonly categoryService: CategoryService) {}

  @Get()
  @ApiOperation(GET_CATEGORIES)
  @ApiResponse({ ...GET_CATEGORIES_RES, type: [CategoryResDto] })
  getCategoriesTree() {
    return this.categoryService.getCategoriesTree();
  }
}
