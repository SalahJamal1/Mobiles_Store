import { Controller, Get, Param } from '@nestjs/common';
import { CategoriesService } from './categories.service';

@Controller('api/v1/categories')
export class CategoriesController {
  constructor(private readonly service: CategoriesService) {}
  @Get()
  findAll() {
    return this.service.findAll();
  }
  @Get(':id')
  findOne(@Param('id') id: number) {
    return this.service.findById(id);
  }
}
