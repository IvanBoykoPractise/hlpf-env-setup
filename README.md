## Student
- Name: Іван Бойко Іван 
- Group: 232.2

## Практичне заняття №7 — Redis + Pagination + Filtering

### Запуск проекту
```bash
cp .env.example .env
docker compose up --build
docker compose run --rm app npm run seed


API: GET /api/products
Параметр,Тип,Default,Опис
page,number,1,Номер сторінки
pageSize,number,10,Елементів на сторінку (max 100)
sort,string,createdAt,Поле сортування
order,asc/desc,desc,Напрямок
categoryId,number,-,Фільтр за категорією
minPrice,number,-,Мінімальна ціна
maxPrice,number,-,Максимальна ціна
search,string,-,Пошук за назвою (ILIKE)


Тест пагінації
GET /api/products?page=1&pageSize=5
{
  "items": [
    { "id": 1, "name": "Product 1", "price": 585, "stock": 50 },
    { "id": 2, "name": "Product 2", "price": 120, "stock": 50 },
    { "id": 3, "name": "Product 3", "price": 990, "stock": 50 },
    { "id": 4, "name": "Product 4", "price": 450, "stock": 50 },
    { "id": 5, "name": "Product 5", "price": 300, "stock": 50 }
  ],
  "meta": {
    "total": 30,
    "page": 1,
    "pageSize": 5,
    "totalPages": 6
  }
}

Тест фільтрації
GET /api/products?categoryId=1&minPrice=500
{
  "items": [
    { "id": 1, "name": "Product 1", "price": 585, "stock": 50, "categoryId": 1 },
    { "id": 4, "name": "Product 4", "price": 720, "stock": 50, "categoryId": 1 }
  ],
  "meta": { "total": 2, "page": 1, "pageSize": 10, "totalPages": 1 }
}

Тест пошуку
GET /api/products?search=mac
{
  "items": [
    { "id": 15, "name": "MacBook Pro", "price": 2499, "stock": 15 }
  ],
  "meta": { "total": 1, "page": 1, "pageSize": 10, "totalPages": 1 }
}

Тест кешування (Redis)
docker compose exec redis redis-cli KEYS "products:*"
1) "products:page=1:pageSize=10:sort=id:order=ASC"
2) "products:page=1:pageSize=5:sort=id:order=ASC"

Тест інвалідації кешу
# До створення продукту (POST /api/products)
redis-cli KEYS "products:*"
1) "products:page=1:pageSize=10:sort=id:order=ASC"

# Після створення продукту (Кеш автоматично очищено)
redis-cli KEYS "products:*"
(empty array)