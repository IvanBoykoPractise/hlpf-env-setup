import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Category } from './categories/category.entity';
import { Product } from './products/product.entity';
import { User } from './users/user.entity'; // ДОДАНО
import { CategoriesModule } from './categories/categories.module';
import { ProductsModule } from './products/products.module';
import { UsersModule } from './users/users.module'; // ДОДАНО
import { AuthModule } from './auth/auth.module';   // ДОДАНО
import { CreateTables1714151234567 } from './migrations/1714151234567-CreateTables';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.POSTGRES_HOST,
      port: parseInt(process.env.POSTGRES_PORT as string, 10),
      username: process.env.POSTGRES_USER,
      password: process.env.POSTGRES_PASSWORD,
      database: process.env.POSTGRES_DB,
      entities: [Category, Product, User], // ДОДАНО User
      synchronize: false,
      migrationsRun: true,
      migrations: [CreateTables1714151234567],
    }),
    CategoriesModule,
    ProductsModule,
    UsersModule, // ДОДАНО
    AuthModule,  // ДОДАНО
  ],
})
export class AppModule {}