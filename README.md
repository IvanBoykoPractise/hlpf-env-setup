## Student
- Name: <Бойко Іван Олексійович>
- Group: <232/2>
 
## Практичне заняття №3 — CRUD REST API для MiniShop
 
### Структура репозиторію
```
.
├── src/
│   ├── categories/
│   │   ├── category.entity.ts
│   │   ├── categories.module.ts
│   │   ├── categories.service.ts
│   │   └── categories.controller.ts
│   ├── products/
│   │   ├── product.entity.ts
│   │   ├── products.module.ts
│   │   ├── products.service.ts
│   │   └── products.controller.ts
│   ├── migrations/
│   │   ├── 1700000001-CreateTables.ts
│   │   └── <timestamp>-AddIsActiveToProducts.ts
│   ├── data-source.ts
│   └── app.module.ts
├── Dockerfile
├── docker-compose.yml
└── README.md
```
 
### Запуск проекту
```bash
cp .env.example .env
docker compose up --build
```
 
### API Endpoints
| Method | URL | Опис |
|--------|-----|------|
| GET | /api/categories | Список категорій |
| GET | /api/categories/:id | Одна категорія |
| POST | /api/categories | Створити категорію |
| PATCH | /api/categories/:id | Оновити категорію |
| DELETE | /api/categories/:id | Видалити категорію |
| GET | /api/products | Список продуктів |
| GET | /api/products/:id | Один продукт |
| POST | /api/products | Створити продукт |
| PATCH | /api/products/:id | Оновити продукт |
| DELETE | /api/products/:id | Видалити продукт |
 
### Перевірка міграцій
```text
<вивід docker compose exec postgres psql -U nestuser -d nestdb -c "\dt">
```
 
### Тест створення категорії
```text
<вивід curl POST /api/categories>
```
 
### Тест створення продукту
```text
<вивід curl POST /api/products>
```
 
### Тест отримання продуктів
```text
<вивід curl GET /api/products>
```
 
### Тест 404
```text
<вивід curl GET /api/products/999>
```
