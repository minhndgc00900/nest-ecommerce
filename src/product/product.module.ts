import { Module } from '@nestjs/common';
import { ProductService } from './product.service';
import { ProductController } from './product.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { ProductSchema } from './schemas/product.schemas';

@Module({
  imports: [
    MongooseModule.forFeature([
      // 3. Setup the mongoose module to use the product schema
      {
        name: 'Product',
        schema: ProductSchema,
      },
    ]),
  ],
  providers: [ProductService],
  controllers: [ProductController],
})
export class ProductModule {}
