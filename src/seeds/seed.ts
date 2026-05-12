import { DataSource } from 'typeorm';
import * as dotenv from 'dotenv';
import { Product } from '../products/product.entity';
import { Category } from '../categories/category.entity';

dotenv.config();

const ds = new DataSource({
  type: 'postgres',
  host: process.env.POSTGRES_HOST || 'localhost',
  port: parseInt(process.env.POSTGRES_PORT || '5432', 10),
  username: process.env.POSTGRES_USER || 'nestuser',
  password: process.env.POSTGRES_PASSWORD || 'nestpass',
  database: process.env.POSTGRES_DB || 'nestdb',
  entities: [Product, Category],
});

async function seed() {
  try {
    await ds.initialize();
    console.log('✅ Connected! Starting seed...');

    const categoryRepo = ds.getRepository(Category);
    const productRepo = ds.getRepository(Product);

    const catNames = ['Electronics', 'Accessories', 'Clothing'];
    // ОСЬ ТУТ ЗМІНА: явно вказуємо тип масиву Category[]
    const savedCats: Category[] = []; 

    for (const name of catNames) {
      let cat = await categoryRepo.findOne({ where: { name } });
      if (!cat) {
        cat = await categoryRepo.save(categoryRepo.create({ name }));
      }
      savedCats.push(cat);
    }

    const count = await productRepo.count();
    if (count < 30) {
      for (let i = 1; i <= 30; i++) {
        const product = productRepo.create({
          name: `Product ${i}`,
          price: Math.floor(Math.random() * 1000) + 10,
          stock: 50,
          category: savedCats[i % 3], 
        });
        await productRepo.save(product);
      }
      console.log('🚀 Seed complete: 30 products added!');
    } else {
      console.log('ℹ️ Database already has enough products.');
    }

    await ds.destroy();
  } catch (err) {
    console.error('❌ Error during seeding:', err);
    process.exit(1);
  }
}

seed();