# Group A WeRent Backend API

A RESTful API built with NestJS for managing products and reviews. This backend provides endpoints for retrieving product information and creating reviews, with comprehensive API documentation via Swagger UI.

## Features

- **Health Check Endpoint** - Monitor application and database health
- **Product Management** - Retrieve product details by ID
- **Review System** - Create and manage product reviews
- **Swagger UI** - Interactive API documentation
- **PostgreSQL Database** - Using Prisma ORM for database management

## Tech Stack

- **Framework**: [NestJS](https://nestjs.com/) (v11.0.1)
- **Language**: TypeScript
- **Database**: PostgreSQL
- **ORM**: Prisma (v7.0.0)
- **API Documentation**: Swagger UI

## Prerequisites

Before you begin, ensure you have the following installed:

- Node.js (v18 or higher)
- npm or yarn
- PostgreSQL database
- Git

## Installation

1. Clone the repository:
```bash
git clone https://github.com/MuhammadIrfanDzaky/group-a-be.git
cd group-a-be
```

2. Install dependencies:
```bash
npm install
```

3. Set up environment variables:
```bash
cp .example.env .env
```

## Database Setup

1. Generate Prisma Client:
```bash
npx prisma generate
```

2. Run database migrations:
```bash
npx prisma migrate dev
```

3. (Optional) Seed the database:
```bash
npx prisma db seed
```

## Running the Application

### Development Mode
```bash
npm run start:dev
```

The application will start on `http://localhost:3000` (or the port specified in your `.env` file).

### Production Mode
```bash
npm run build
npm run start:prod
```

### Debug Mode
```bash
npm run start:debug
```

## API Documentation

Once the application is running, you can access the Swagger UI documentation at:

**http://localhost:3000/api**

The Swagger UI provides:
- Interactive API documentation
- Try-it-out functionality for all endpoints
- Request/response schemas
- Example values for testing

## API Endpoints

### Health Check

#### GET `/`
Get the health status of the application and database.

**Response:**
```json
{
  "status": "UP",
  "components": {
    "database": {
      "status": "UP",
      "details": {
        "connection": "OK",
        "responseTimeMs": 5
      }
    }
  }
}
```

### Products

#### GET `/api/products/:id`
Get a product by ID with its reviews.

**Parameters:**
- `id` (path parameter) - Product ID

**Response:**
```json
{
  "id": 1,
  "title": "Product Name",
  "image": "https://example.com/image.jpg",
  "review": {
    "id": 1,
    "reviewer_name": "John Doe",
    "review_text": "Great product!",
    "created_at": "2024-01-01T00:00:00.000Z"
  },
  "total": 1
}
```

#### POST `/api/products/:id/review`
Create a new review for a product.

**Parameters:**
- `id` (path parameter) - Product ID

**Request Body:**
```json
{
  "reviewer_name": "John Doe",
  "review_text": "Great product! Highly recommended."
}
```

**Response:**
```json
{
  "id": 1,
  "product_id": 1,
  "reviewer_name": "John Doe",
  "review_text": "Great product! Highly recommended.",
  "created_at": "2024-01-01T00:00:00.000Z"
}
```

## Project Structure

```
group-a-be/
├── prisma/
│   ├── migrations/          # Database migrations
│   ├── schema.prisma        # Prisma schema definition
│   └── seed.ts              # Database seed file
├── src/
│   ├── common/
│   │   ├── dto/             # Shared DTOs
│   │   └── middleware/      # Custom middleware
│   ├── products/
│   │   ├── dto/             # Product-related DTOs
│   │   ├── entities/        # Product entities
│   │   ├── products.controller.ts
│   │   ├── products.service.ts
│   │   └── products.module.ts
│   ├── prisma/
│   │   ├── prisma.service.ts
│   │   └── prisma.module.ts
│   ├── app.controller.ts
│   ├── app.service.ts
│   ├── app.module.ts
│   └── main.ts              # Application entry point
├── test/                    # E2E tests
├── .example.env             # Environment variables example
├── package.json
└── README.md
```

## Database Schema

### Products
- `id` (Int, Primary Key)
- `title` (String)
- `image_url` (String, Optional)
- `created_at` (DateTime)

### Reviews
- `id` (Int, Primary Key)
- `product_id` (Int, Foreign Key)
- `reviewer_name` (String)
- `review_text` (String, Optional)
- `created_at` (DateTime)

## Available Scripts

- `npm run build` - Build the application
- `npm run start` - Start the application
- `npm run start:dev` - Start in development mode with watch
- `npm run start:debug` - Start in debug mode
- `npm run start:prod` - Start in production mode
- `npm run lint` - Run ESLint
- `npm run format` - Format code with Prettier
- `npm run test` - Run unit tests
- `npm run test:watch` - Run tests in watch mode
- `npm run test:cov` - Run tests with coverage
- `npm run test:e2e` - Run end-to-end tests

## CORS Configuration

The application is configured to accept requests from:
- `http://localhost:3001`
- `http://localhost:3000`
- `https://final-project-fe-muhammad-irfan-dza.vercel.app`
- `https://a-we-rent-fe.vercel.app/product`

Allowed methods: `GET`, `POST`

## Support

For questions or issues, please open an issue in the repository.
