import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Users } from './users/users.entity';
import { Tokens } from './tokens/tokens.entity';
import { TokensModule } from './tokens/tokens.module';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MobilesModule } from './product/product.module';
import { CartModule } from './cart/cart.module';
import { Cart } from './cart/cart.entity';
import { OrderModule } from './order/order.module';
import { Order } from './order/order';
import { PaymentsModule } from './payments/payments.module';
import { Product } from './product/product';
import { CategoriesModule } from './categories/categories.module';
import { Categories } from './categories/categories';
@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    TypeOrmModule.forRootAsync({
      inject: [ConfigService],
      useFactory: (config: ConfigService) => ({
        host: config.get<string>('HOST'),
        port: config.get<number>('DB_PORT'),
        database: config.get<string>('DATABASE'),
        username: config.get<string>('USERNAME'),
        password: config.get<string>('PASSWORD'),
        synchronize: config.get<boolean>('SYNCHRONIZE') ?? false,
        type: 'mysql',
        entities: [Users, Tokens, Product, Cart, Order, Categories],
      }),
    }),
    TokensModule,
    UsersModule,
    AuthModule,
    MobilesModule,
    CartModule,
    OrderModule,
    PaymentsModule,
    CategoriesModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
