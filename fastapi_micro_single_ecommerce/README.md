# FastAPI Microservices-Based Single Vendor E-Commerce

## Overview
This repository contains the source code and architecture for a FAANG-level e-commerce application, developed using **FastAPI** with a microservices-based architecture. The application supports a single-vendor model and is designed to handle high scalability, fault tolerance, and modular development. It is open-source and aims to provide a quick start for developers building high-performance, single-vendor e-commerce platforms.

---

## Purpose
This project is designed to help developers build a robust, scalable, and production-ready single-vendor e-commerce platform. It serves as a foundation for projects aspiring to meet FAANG-level standards, while being open for contributions and extensions.

---

## Features
- **Microservices Architecture**: Modular and scalable design for easy maintenance and development.
- **Single Vendor**: Tailored for a single seller managing the store.
- **High Performance**: Optimized with FastAPI for low-latency and high-throughput APIs.
- **Secure and Robust**: Implements modern security practices (JWT Authentication, OAuth2, etc.).
- **Extensible Modules**: Each module is standalone and can be extended as needed.
- **Support for Indian Standards**: Taxes, address formatting, and other requirements designed specifically for Indian users.
- **MongoDB**: High-performance NoSQL database for scalability and flexibility.

---

## Tech Stack
- **Backend**: FastAPI
- **Frontend**: React/Next.js (optional for API integration)
- **Database**: MongoDB
- **Message Queue**: RabbitMQ/Apache Kafka for inter-service communication
- **Caching**: Redis for session management and caching
- **Containerization**: Docker and Kubernetes for deployment
- **Web Server**: Nginx as a reverse proxy

---

## Architecture
The application is divided into multiple services:

### User Service (auth)
- **Routes**:
  - [POST] `/auth/login` - User login
  - [POST] `/auth/register` - User registration
  - [GET] `/auth/profile` - Fetch user profile
  - [PUT] `/auth/profile` - Update user profile

### Product Service (products)
- **Routes**:
  - [POST] `/products/` - Add a new product
  - [GET] `/products/` - Get all products
  - [GET] `/products/{product_id}` - Get product details
  - [PUT] `/products/{product_id}` - Update product details
  - [DELETE] `/products/{product_id}` - Delete a product
  - [GET] `/products/search` - Search and filter products

### Order Service (orders)
- **Routes**:
  - [POST] `/orders/` - Create a new order
  - [GET] `/orders/` - Get all orders for a user
  - [GET] `/orders/{order_id}` - Get order details
  - [PUT] `/orders/{order_id}` - Update order status
  - [DELETE] `/orders/{order_id}` - Cancel an order

### Payment Service (payments)
- **Routes**:
  - [POST] `/payments/` - Initiate a payment
  - [GET] `/payments/{payment_id}` - Get payment details
  - [POST] `/payments/refund` - Initiate a refund

### Cart Service (cart)
- **Routes**:
  - [POST] `/cart/` - Add an item to the cart
  - [GET] `/cart/` - View cart items
  - [PUT] `/cart/` - Update cart item quantity
  - [DELETE] `/cart/{item_id}` - Remove an item from the cart

### Notification Service (notifications)
- **Routes**:
  - [POST] `/notifications/` - Send a notification
  - [GET] `/notifications/` - Get all notifications

### Admin Service (admin)
- **Routes**:
  - [GET] `/admin/dashboard` - View vendor analytics dashboard
  - [GET] `/admin/orders` - View all orders
  - [GET] `/admin/products` - Manage products

### Tax and Compliance Service (tax)
- **Routes**:
  - [GET] `/tax/calculate` - Calculate tax for an order

### Recommendation Service (recommendations)
- **Routes**:
  - [GET] `/recommendations/` - Fetch product recommendations for a user

### Analytics and Monitoring Service (analytics)
- **Routes**:
  - [GET] `/analytics/` - Fetch sales and user engagement metrics

### Search Service (search)
- **Routes**:
  - [GET] `/search/` - Search for products

### Loyalty and Rewards Program (rewards)
- **Routes**:
  - [GET] `/rewards/` - Fetch loyalty points
  - [POST] `/rewards/redeem` - Redeem points

### Audit Logging Service (logs)
- **Routes**:
  - [GET] `/logs/` - Fetch system logs

### Customer Support Service (support)
- **Routes**:
  - [POST] `/support/tickets` - Create a support ticket
  - [GET] `/support/tickets` - View all tickets

### Subscription Management (subscriptions)
- **Routes**:
  - [POST] `/subscriptions/` - Subscribe to a plan
  - [GET] `/subscriptions/` - View current subscription
  - [POST] `/subscriptions/cancel` - Cancel subscription

### AI Fraud Detection (fraud)
- **Routes**:
  - [GET] `/fraud/check` - Check for fraudulent activities

### Delivery Tracking Service (delivery)
- **Routes**:
  - [GET] `/delivery/{order_id}` - Track delivery status

### Internationalization and Localization (localization)
- **Routes**:
  - [GET] `/localization/` - Fetch region-specific settings

### AB Testing and Experimentation (experiments)
- **Routes**:
  - [POST] `/experiments/` - Create an experiment
  - [GET] `/experiments/` - Get experiment results

### Social Integration (social)
- **Routes**:
  - [POST] `/social/share` - Share a product link
  - [GET] `/social/reviews` - Fetch product reviews

---

## Setup Instructions

### Prerequisites
- Python 3.10+
- Docker and Docker Compose
- Node.js (for frontend, optional)

### Installation
1. Clone the repository:
   ```bash
   git clone https://github.com/username/fastapi_micro_single_ecommerce.git
   cd fastapi_micro_single_ecommerce
   ```

2. Set up environment variables:
   - Create a `.env` file for each service based on the provided `.env.example` files.

3. Build and run the services using Docker Compose:
   ```bash
   docker-compose up --build
   ```

4. Access the APIs:
   - API Gateway: `http://localhost:8000`
   - Individual Services: Ports defined in `docker-compose.yml`

---

## Development Workflow

1. **Branching Strategy**: Follow GitFlow for branching.
2. **Code Quality**: Use tools like `black`, `flake8`, and `mypy`.
3. **Testing**: Write unit and integration tests using `pytest`.
4. **CI/CD**: Use GitHub Actions for automated testing and deployment.

---

## Contributing
We welcome contributions! Please check the `CONTRIBUTING.md` file for guidelines.

---

## License
This project is licensed under the MIT License. See the `LICENSE` file for details.

---

## Author
- **Name**: Vijay
- **Email**: [be1newinner@gmail.com](mailto:be1newinner@gmail.com)
- **YouTube**: [Asaan Hai Coding](https://www.youtube.com/@asaan_hai_coding)

---

## Contact
For any queries, please reach out to [Vijay](mailto:be1newinner@gmail.com).
