# 📦 Listings API Documentation

## 🚀 GET `/api/listings`

Fetches all product listings from the database with support for filters, full-text search, sorting, field selection, and pagination.

---

## ✅ Query Parameters 

| Name         | Type      | Description                                                     |
| ------------ | --------- | --------------------------------------------------------------- |
| `search`     | `string`  | Full-text search on fields like title, description, brand, etc. |
| `brand`      | `string`  | Filter by brand name                                            |
| `category`   | `string`  | Filter by product category                                      |
| `condition`  | `string`  | Filter by item condition (e.g., New, Used)                      |
| `location`   | `string`  | Filter by city/area                                             |
| `model`      | `string`  | Filter by model name                                            |
| `status`     | `string`  | One of: `available`, `sold`, `reserved`                         |
| `price[gte]` | `number`  | Minimum price                                                   |
| `price[lte]` | `number`  | Maximum price                                                   |
| `warranty`   | `boolean` | Filter listings that include warranty                           |
| `isFeatured` | `boolean` | Show only featured items                                        |
| `sortBy`     | `string`  | Field to sort by (e.g., `price`, `createdAt`)                   |
| `sortOrder`  | `string`  | `asc` or `desc` (default: `asc`)                                |
| `fields`     | `string`  | Comma-separated list of fields to include (e.g., `title,price`) |
| `page`       | `number`  | Page number for pagination (default: 1)                         |
| `limit`      | `number`  | Number of items per page (default: 10)                          |

---

## 🔍 Searchable Fields 

Search is case-insensitive and works on the following fields:

```
['title', 'description', 'category', 'brand', 'model', 'location', 'tags']
```

**Example:**

```
/api/listings?search=giant
```

---

## 📊 Filter Examples

### Filter by Brand and Condition

```
/api/listings?brand=Giant&condition=Used
```

### Filter by Price Range

```
/api/listings?price[gte]=20000&price[lte]=60000
```

### Filter by Status and Warranty

```
/api/listings?status=available&warranty=true
```

---

## 🔁 Pagination

| Param   | Example                 |
| ------- | ----------------------- |
| `page`  | `/api/listings?page=2`  |
| `limit` | `/api/listings?limit=5` |

---

## 🔃 Sorting

| Param       | Example                        |
| ----------- | ------------------------------ |
| `sortBy`    | `/api/listings?sortBy=price`   |
| `sortOrder` | `/api/listings?sortOrder=desc` |

You can sort by `price`, `createdAt`, or any other valid field.

---

## ✂️ Field Selection

Only return certain fields:

```
/api/listings?fields=title,price,brand
```

---

## 📦 Full Example

```
GET /api/listings?search=road&price[gte]=20000&price[lte]=60000&brand=Giant&sortBy=price&sortOrder=asc&page=1&limit=4&fields=title,price,brand,condition
```

---

## ✅ Sample Response

```json
{
  "success": true,
  "message": "Listings retrived.",
  "statusCode": 201,
  "data": {
    "data": [
      {
        "_id": "67fa1ab4dbca562f77ca239f",
        "title": "Road Bike",
        "description": "A well-maintained Shimano 105 groupset road bike.",
        "category": "Bicycles",
        "brand": "Giant",
        "price": 45000,
        "condition": "Used - Like New",
        "status": "available",
        "userID": {
          "_id": "67fa197300b5b03726eb0348",
          "email": "a@a.com",
          "phone": "123123"
        }
      },
      {"................"},
      {
        "_id": "67fa1b955f1e626c0f6b6cb5",
        "title": "Road Bike",
        "description": "A well-maintained Shimano 105 groupset road bike.",
        "category": "Bicycles",
        "brand": "Giant",
        "price": 45000,
        "condition": "Used - Like New",
        "status": "available",
        "userID": {
          "_id": "67fa197300b5b03726eb0348",
          "email": "a@a.com",
          "phone": "123123"
        }
      }
    ],
    "meta": {
      "page": 1,
      "limit": 4,
      "total": 4,
      "totalPage": 1
    }
  }
}
```

---

> Need Swagger/OpenAPI or Postman collection? Let us know!
