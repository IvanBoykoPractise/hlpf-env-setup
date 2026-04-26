## Student
- Name: Іван Бойко
- Group: 232.2

## Практичне заняття №4 — DTO + class-validator + Pipes

### Структура репозиторію
## Практичне заняття №4 — DTO + class-validator + Pipes
 
### Структура репозиторію
```
.
├── src/
│   ├── categories/
│   │   ├── dto/
│   │   │   ├── create-category.dto.ts
│   │   │   └── update-category.dto.ts
│   │   ├── category.entity.ts
│   │   ├── categories.module.ts
│   │   ├── categories.service.ts
│   │   └── categories.controller.ts
│   ├── products/
│   │   ├── dto/
│   │   │   ├── create-product.dto.ts
│   │   │   └── update-product.dto.ts
│   │   ├── product.entity.ts
│   │   ├── products.module.ts
│   │   ├── products.service.ts
│   │   └── products.controller.ts
│   ├── common/
│   │   └── pipes/
│   │   	└── trim.pipe.ts
│   ├── migrations/
│   ├── data-source.ts
│   ├── main.ts
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
 
### Тест валідації — порожнє ім'я категорії
```# Запит
Invoke-RestMethod -Uri "http://localhost:3000/api/categories" -Method Post -Body '{"name": ""}' -ContentType "application/json"

# Відповідь
{
  "message": ["Назва занадто коротка (мін. 2 символи)", "Назва не може бути порожньою"],
  "error": "Bad Request",
  "statusCode": 400
}

<вивід curl POST /api/categories з {"name": ""}>
```
 
### Тест валідації — від'ємна ціна продукту
```# Запит
Invoke-RestMethod -Uri "http://localhost:3000/api/api/products" -Method Post -Body '{"name": "Молоко", "price": -5}' -ContentType "application/json"

# Відповідь
{
  "message": ["Ціна не може бути від'ємною"],
  "error": "Bad Request",
  "statusCode": 400
}
<вивід curl POST /api/products з {"name": "Test", "price": -5}>
```
 
### Тест валідації — зайве поле
```# Запит
Invoke-RestMethod -Uri "http://localhost:3000/api/categories" -Method Post -Body '{"name": "Смартфони", "isAdmin": true}' -ContentType "application/json"

# Відповідь
{
  "message": ["property isAdmin should not exist"],
  "error": "Bad Request",
  "statusCode": 400
}
<вивід curl POST /api/categories з {"name": "Test", "isAdmin": true}>
```
 
### Тест TrimPipe
```# Запит
Invoke-RestMethod -Uri "http://localhost:3000/api/categories" -Method Post -Body '{"name": "   Техніка   "}' -ContentType "application/json"

# Відповідь (об’єкт створено з чистим ім'ям)
{
  "id": 12,
  "name": "Техніка"
}
<вивід curl POST /api/categories з {"name": "  Trimmed  "}>
```
 
### Тест валідне створення продукту
```# Запит
$body = @{ name="IPhone 15"; price=45000; description="New model" } | ConvertTo-Json
Invoke-RestMethod -Uri "http://localhost:3000/api/api/products" -Method Post -Body $body -ContentType "application/json"

# Відповідь
{
  "id": 1,
  "name": "IPhone 15",
  "price": 45000,
  "description": "New model"
}
<вивід curl POST /api/products з валідними даними>
```


### Запуск проекту
```bash
cp .env.example .env
docker compose up --build