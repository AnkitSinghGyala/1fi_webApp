# 1Fi SDE1 Assignment

A full-stack web application that displays products with multiple EMI plans backed by mutual funds. Built as part of the 1Fi SDE1 Assignment.

## Setup and Run Instructions

### Prerequisites
- Node.js (v18+)
- A PostgreSQL Database Connection URI

### Steps
1. Navigate into the `fi-assignment` directory.
2. Install dependencies:
   ```bash
   npm install
   ```
3. Create a `.env` file in the root directory and add your PostgreSQL connection string:
   ```env
   DATABASE_URL="postgresql://user:password@localhost:5432/mydb?schema=public"
   ```
4. Push the schema to your database (this will create the necessary tables):
   ```bash
   npx prisma db push
   ```
5. Seed the database with sample products, variants, and EMI plans:
   ```bash
   npm run seed
   ```
6. Start the development server:
   ```bash
   npm run dev
   ```
7. Open [http://localhost:3000](http://localhost:3000) in your browser.

## API Endpoints

### 1. Get All Products
- **Endpoint**: `GET /api/products`
- **Description**: Returns a list of all products in the database.
- **Example Response**:
```json
{
  "success": true,
  "data": [
    {
      "id": "64b0f...",
      "name": "iPhone 17 Pro",
      "slug": "iphone-17-pro",
      "image": "https://...",
      "mrp": 134900,
      "basePrice": 127400,
      "createdAt": "...",
      "updatedAt": "..."
    }
  ]
}
```

### 2. Get Product Details by Slug
- **Endpoint**: `GET /api/products/:slug`
- **Description**: Returns detailed information for a specific product, including variants and EMI plans.
- **Example Response**:
```json
{
  "success": true,
  "data": {
    "id": "64b0f...",
    "name": "iPhone 17 Pro",
    "slug": "iphone-17-pro",
    "image": "https://...",
    "mrp": 134900,
    "basePrice": 127400,
    "variants": [
      {
        "id": "...",
        "name": "Storage",
        "options": [
          { "id": "...", "value": "256GB", "extraPrice": 0 },
          { "id": "...", "value": "512GB", "extraPrice": 20000 }
        ]
      }
    ],
    "emiPlans": [
      {
        "id": "...",
        "months": 3,
        "interestRate": 0,
        "cashback": 7500
      }
    ]
  }
}
```

## Tech Stack Used
- **Frontend**: React, Next.js (App Router), Tailwind CSS
- **Backend**: Node.js, Next.js Route Handlers
- **Database**: PostgreSQL
- **ORM**: Prisma
- **Language**: TypeScript

## Schema Used (Prisma)

### Product Model
- `id` (String, UUID)
- `name` (String)
- `slug` (String, unique) - Used for unique URLs like `/products/iphone-17-pro`
- `image` (String)
- `mrp` (Int)
- `basePrice` (Int)
- `variants` (Relation to Variant)
- `emiPlans` (Relation to EmiPlan)

### Variant Model
- `id` (String, UUID)
- `productId` (String)
- `name` (String) - e.g., "Storage" or "Color"
- `options` (Relation to Option)

### Option Model
- `id` (String, UUID)
- `variantId` (String)
- `value` (String) - e.g., "256GB"
- `extraPrice` (Int, default 0) - Additional cost if selected

### EmiPlan Model
- `id` (String, UUID)
- `productId` (String)
- `months` (Int)
- `interestRate` (Float) - e.g., 0 or 10.5
- `cashback` (Int, default 0)
