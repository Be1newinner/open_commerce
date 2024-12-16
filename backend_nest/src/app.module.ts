import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { ProductsModule } from './modules/products/products.module';
import { CartModule } from './modules/cart/cart.module';
import { BlogsModule } from './modules/blogs/blogs.module';
import { OrdersModule } from './modules/orders/orders.module';
import { UserModule } from './modules/user/user.module';
import { ReviewsModule } from './modules/reviews/reviews.module';
import { WishlistModule } from './modules/wishlist/wishlist.module';
import { SharedModule } from './modules/shared/shared.module';

@Module({
  imports: [
    MongooseModule.forRoot(process.env.MONGO_URI),
    ProductsModule,
    CartModule,
    BlogsModule,
    OrdersModule,
    UserModule,
    ReviewsModule,
    WishlistModule,
    SharedModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
