import { Controller, Get, Param, ParseIntPipe } from '@nestjs/common';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';
import { ProductService } from './product.service';

@Controller('api/v1/products')
export class ProductController {
  constructor(private service: ProductService) {}

  @ApiOperation({ summary: 'Get all Products with pagination' })
  @ApiResponse({ status: 200, description: 'List of Product' })
  @Get()
  findAll() {
    return this.service.findAll();
  }

  @ApiOperation({ summary: 'Get Product by id' })
  @ApiResponse({ status: 200, description: 'Single Product' })
  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.service.findById(id);
  }
}
