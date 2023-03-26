# API documentation
## Content
1. [Description](#description)
2. [Technical requirements](#technical-requirements)
3. [Base URL](#base-url)
4. [Implementation details](#implementation-details) <br>
   4.1 [Authentication](#1-authentication) <br>
   4.2 [Endpoint api/v1/users](#2-endpoint-apiv2users-) <br>
   4.3 [Endpoint api/v1/products](#3-endpoint-apiv2products-) <br>
   4.4 [Endpoint api/v1/orders](#4-endpoint-apiv2orders-) <br>
   4.5 [Endpoint api/v1/carts](#5-endpoint-apiv2carts-)
5. [Install](#install)
6. [Run](#run-in-docker-container)

### Data modeling you can find here: <br>
[DataModeling.md](DataModeling.md)
______

## Description
This project is a clothing shop. This application has the following functionality: add, update, delete and get information about users, products, carts and orders.
_____
## Technical requirements
- Programming language - Javascript
- Database - PostgreSQL
- Docker
_____
## Base URL
`http://localhost:3000`
_____

## Implementation details
### 1. Authentication.
- Endpoint: `api/v2/login`
- Standard: JWT
> Request
> ```
> curl -X 'POST' \
> ‘/login’ \
> {
>   "username": "username",
>   "password": "password"
> }
> ```

> Response body
> ```
> {
>   "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwicm9sZXMiOlsiQURNSU4iXSwiZXhwIjoiMTY3OTMzMTQ1MDI0aCJ9.4d2cdf71-78e57a475bed0bd4414526df-196a8ed6"
> }
> ```

### 2.  Endpoint `api/v2/users`:
  - GET `api/v2/users` - get all users
      - Server should answer with status code 200 and all users records.
      - Possible parameters:

| Parameter | Type    | Required | Description                                  |
|-----------|---------|----------|----------------------------------------------|
| `name`    | string  | Yes      | Part of the name of the user to search for.  |
| `email`   | string  | Yes      | Part of the email of the user to search for. |
| `isAdmin` | boolean | Yes      | If user is admin - true, else - false.       | 


#### **Example 1:**
> Request
> ```
> curl -X 'GET' \
> ‘api/v1/users’ \
> ```

> Response body
> ```
> [{
>   "id": 1,
>   "name": "string",
>   "password": "string",
>   "email": "string",
>   "isAdmin": false,
> },
> {
>   "id": 2,
>   "name": "string",
>   "password": "string",
>   "email": "string",
>   "isAdmin": false,
> }]
> ```

#### **Example 2:**
> Request:
> ```
> curl -X 'GET' \
> 'api/v1/users?name=jo
> ```

> Response body
> ```
> [ {
>     "id": 1,
>     "name": "John",
>     "password": "string",
>     "email": "john@example.com",
>     "isAdmin": false,
>   },
>   {
>     "id": 3,
>     "name": "Joseph",
>     "password": "string",
>     "email": "joseph@example.com",
>     "isAdmin": false,
>   } ] 
> ```


  - GET `api/v2/users/{userId}` - get one user by ID
    - Server should answer with status code 200 and record with id === userId if it exists
    - Server should answer with status code 400 and corresponding message if userId is invalid (not uuid)
    - Server should answer with status code 404 and corresponding message if record with id === userId doesn't exist

| Parameter | Type   | Required | Description |
|-----------|--------|----------|-------------|
| `userId`  | string | yes      | user's ID   |

> Request
> ```
> curl -X 'GET' \
> ‘api/v1/users/1’ \
> ```

> Response body
> ```
> {
>   "id": 1,
>   "name": "string",
>   "password": "string",
>   "email": "string",
>   "isAdmin": false,
> }
> ```

  - POST `api/v2/users` - create record about new user and put it in database. The request body should contain the required information for creating a new product, such as name, price, description and image.
    - Server should answer with status code 201 and newly created record
    - Server should answer with status code 400 and corresponding message if request body does not contain required fields

> Request
> ```
> curl -X 'POST' \
> ‘api/v1/users/0’  \
> -d '{
>   "id": 0,
>   "name": "string",
>   "password": "string",
>   "email": "string",
>   "isAdmin": false,
> }'
> ```

> Response body
> ```
> {
>   "id": 0,
>   "name": "string",
>   "password": "string",
>   "email": "string",
>   "isAdmin": false,
> }
> ```

  - PUT `api/v2/users/{userId}` - update existing user. The request body should contain the updated information for the product.
    - Server should answer with status code 200 and update the record
    - Server should answer with status code 400 and corresponding message if userId is invalid (not uuid)
    - Server should answer with status code 404 and corresponding message if record with id === userId doesn't exist

| Parameter | Type   | Required | Description |
|-----------|--------|----------|-------------|
| `userId`  | string | yes      | user's ID   |

> Request
> ```
> curl -X 'PUT' \
> ‘api/v1/users/3’  \
> -d '{
>   "id": 3,
>   "name": "string",
>   "password": "string",
>   "email": "string",
>   "isAdmin": false,
> }'
> ```

> Response body
> ```
> {
>   "id": 3,
>   "name": "string",
>   "password": "string",
>   "email": "string",
>   "isAdmin": false,
> }
> ```

  - DELETE `api/v2/users/{userId}` - delete existing user from database
    - Server should answer with status code 204 if the record was found and delete the record
    - Server should answer with status code 400 and corresponding message if userId is invalid (not uuid)
    - Server should answer with status code 404 and corresponding message if record with id === userId doesn't exist

| Parameter | Type   | Required | Description |
|-----------|--------|----------|-------------|
| `userId`  | string | yes      | user's ID   |

> Request
> ```
> curl -X 'DELETE' \
> ‘api/v1/users/1’ \
> ```

> Response body
> ```
> No Content
> ```

### 3. Endpoint `api/v2/products`:
  - GET `api/v2/products` - get all products
    - Server should answer with status code 200 and all products records
    - Possible query parameters:

| Parameter  | Type   | Required | Description                                        |
|------------|--------|----------|----------------------------------------------------|
| `category` | string | Yes      | Part of the category of the product to search for. |
| `minPrice` | number | Yes      | Minimal price of the product.                      |
| `maxPrice` | number | Yes      | Maximum price of the product.                      |
| `brand`    | string | Yes      | Part of the brand of the product to search for.    |
| `title`    | string | Yes      | Part of the title of the product to search for.    |

> Request
> ```
> curl -X 'GET' \
> ‘api/v1/products’ \
> ```

> Response body
> ```
> [{
>   "id": 1,
>   "title": "string",
>   "discription": "string",
>   "category": "string",
>   "brand": "string",
>   "price": 1,
>   "image": "string",
>   "modelId": 1,
> },
> {
>   "id": 2,
>   "title": "string",
>   "discription": "string",
>   "category": "string",
>   "brand": "string",
>   "price": 2,
>   "image": "string",
>   "modelId": 2,
> }]

  - GET `api/v2/products/{productId}` - get one product
    - Server should answer with status code 200 and record with id === productId if it exists
    - Server should answer with status code 400 and corresponding message if productId is invalid (not uuid)
    - Server should answer with status code 404 and corresponding message if record with id === productId doesn't exist

| Parameter   | Type   | Required | Description  |
|-------------|--------|----------|--------------|
| `productId` | string | yes      | product's ID |

> Request
> ```
> curl -X 'GET' \
> ‘api/v1/products/1’ \
> ```

> Response body
> ```
> {
>   "id": 1,
>   "title": "string",
>   "discription": "string",
>   "category": "string",
>   "brand": "string",
>   "price": 1,
>   "image": "string",
>   "modelId": 1,
> }
> ```

  - GET `api/v2/products?category=:category` - get a list of products which title partially matches the specified parameter.
    - Server should answer with status code 200 and array of records with category === category if it exists
    - Server should answer with status code 400 and corresponding message if category is invalid (not uuid)
    - Server should answer with status code 404 and corresponding message if record with category === category doesn't exist

| Parameter  | Type    | Required | Description                                        |
|------------|---------|----------|----------------------------------------------------|
| `category` | string  | Yes      | Part of the category of the product to search for. |

> Request:
> ```
> curl -X 'GET' \
> 'api/v1/products?title=co
> ```

> Response body
> ```
> [ {
>     "id": 1,
>     "title": "coat",
>     "discription": "string",
>     "category": "string",
>     "brand": "string",
>     "price": 1,
>     "image": "string",
>     "modelId": 1,
>   },
>   {
>     "id": 6,
>     "title": "corset",
>     "discription": "string",
>     "category": "string",
>     "brand": "string",
>     "price": 1,
>     "image": "string",
>     "modelId": 1,
>   } ] 
> ```

  - POST `api/v2/products` - create record about new product and put it in database. The request body should contain the required information for creating a new product, such as name, price, description and image.
    - Server should answer with status code 201 and newly created record
    - Server should answer with status code 400 and corresponding message if request body does not contain required fields

> Request
> ```
> curl -X 'POST' \
> ‘api/v1/products/1’  \
> -d '{
>   "id": 1,
>   "title": "string",
>   "discription": "string",
>   "category": "string",
>   "brand": "string",
>   "price": 1,
>   "image": "string",
>   "modelId": 1,
> }'
> ```

> Response body
> ```
> {
>   "id": 1,
>   "title": "string",
>   "discription": "string",
>   "category": "string",
>   "brand": "string",
>   "price": 1,
>   "image": "string",
>   "modelId": 1,
> }
> ```

  - PUT `api/v2/products/{productId}` - update existing product. The request body should contain the updated information for the product.
    - Server should answer with status code 200 and update the record
    - Server should answer with status code 400 and corresponding message if productId is invalid (not uuid)
    - Server should answer with status code 404 and corresponding message if record with id === productId doesn't exist

| Parameter   | Type   | Required | Description  |
|-------------|--------|----------|--------------|
| `productId` | string | yes      | product's ID |

> Request
> ```
> curl -X 'PUT' \
> ‘api/v1/products/3’  \
> -d '{
>   "id": 3,
>   "title": "string",
>   "discription": "string",
>   "category": "string",
>   "brand": "string",
>   "price": 3,
>   "image": "string",
>   "modelId": 3,
> }'
> ```

> Response body
> ```
> {
>   "id": 3,
>   "title": "string",
>   "discription": "string",
>   "category": "string",
>   "brand": "string",
>   "price": 3,
>   "image": "string",
>   "modelId": 3,
> }
> ```

  - DELETE `api/v2/products/{productId}` - delete existing product from database
    - Server should answer with status code 204 if the record was found and delete the record
    - Server should answer with status code 400 and corresponding message if productId is invalid (not uuid)
    - Server should answer with status code 404 and corresponding message if record with id === productId doesn't exist

| Parameter   | Type   | Required | Description  |
|-------------|--------|----------|--------------|
| `productId` | string | yes      | product's ID |

> Request
> ```
> curl -X 'DELETE' \
> ‘api/v1/products/1’ \
> ```

> Response body
> ```
> No Content
> ```    

### 4. Endpoint `api/v2/orders`:
  - GET `api/v2/orders` - get all orders
    - Server should answer with status code 200 and all orders records
    - Possible query parameters:

| Parameter    | Type   | Required | Description                                                             |
|--------------|--------|----------|-------------------------------------------------------------------------|
| `start_date` | date   | Yes      | The start date of the period to search for. Format should be YYYY-MM-DD |
| `end_date`   | date   | Yes      | The end date of the period to search for. Format should be YYYY-MM-DD   |
| `status`     | string | Yes      | The status of the orders to search for                                  |

#### **Example 1:**
> Request
> ```
> curl -X 'GET' \
> ‘api/v1/orders’ \
> ```

> Response body
> ```
> [{
>   "id": 1,
>   "userId": "string",
>   "products": "string",
>   "status": "pending"
>   "date": "2023-02-15T00:00:00+0400",
> },
> {
>   "id": 2,
>   "userId": "string",
>   "products": "string",
>   "status": "pending"
>   "date": "2023-02-16T00:00:00+0400",
> }]
> ```
#### **Example 2:**
> > Request:
> ```
> curl -X 'GET' \
> 'api/v1/orders?start_date="2023-02-10"&end_date="2023-02-15"
> ```

> Response body
> ```
> [ {
>     "id": 1,
>     "userId": "string",
>     "products": "string",
>     "status": "pending"
>     "date": "2023-02-11",
>   },
>   {
>     "id": 8,
>     "userId": "string",
>     "products": "string",
>     "status": "shipped"
>     "date": "2023-02-13",
>   } ] 
> ```

#### **Example 3:**
> Request:
> ```
> curl -X 'GET' \
> 'api/v1/orders?start_date="2023-02-10"&end_date="2023-02-15&status=pending"
> ```

> Response body
> ```
> [ {
>     "id": 1,
>     "userId": "string",
>     "products": ["string"],
>     "date": "2023-02-11",
>     "status": "pending"
>   } ] 
> ```

  - GET `api/v2/orders/{orderId}` - get one order
    - Server should answer with status code 200 and record with id === orderId if it exists
    - Server should answer with status code 400 and corresponding message if orderId is invalid (not uuid)
    - Server should answer with status code 404 and corresponding message if record with id === orderId doesn't exist

| Parameter | Type   | Required | Description |
|-----------|--------|----------|-------------|
| `orderId` | string | yes      | order's ID  |

> Request
> ```
> curl -X 'GET' \
> ‘api/v1/orders/1’ \
> ```

> Response body
> ```
> {
>   "id": 1,
>   "userId": "string",
>   "products": "string",
>   "status": "pending"
>   "date": "2023-02-15T00:00:00+0400",
> }
> ```

  - POST `api/v2/orders` - create record about new order and put it in database. The request body should contain the required information for creating a new order.
    - Server should answer with status code 201 and newly created record
    - Server should answer with status code 400 and corresponding message if request body does not contain required fields

> Request
> ```
> curl -X 'POST' \
> ‘api/v1/orders/1’  \
> -d '{
>   "id": 1,
>   "userId": "string",
>   "products": ["string"],
>   "status": "pending"
>   "date": "2023-02-15T00:00:00+0400",
> }'
> ```

> Response body
> ```
> {
>   "id": 1,
>   "userId": "string",
>   "products": ["string"],
>   "status": "pending",
>   "date": "2023-02-15T00:00:00+0400",
> }
> ```

  - PUT `api/v2/orders/{orderId}` - update existing order. The request body should contain the updated information for the order.
    - Server should answer with status code 200 and update record
    - Server should answer with status code 400 and corresponding message if orderId is invalid (not uuid)
    - Server should answer with status code 404 and corresponding message if record with id === orderId doesn't exist

| Parameter | Type   | Required | Description |
|-----------|--------|----------|-------------|
| `orderId` | string | yes      | order's ID  |

> Request
> ```
> curl -X 'PUT' \
> ‘api/v1/orders/1’  \
> -d '{
>   "id": 1,
>   "userId": "string",
>   "products": ["string"],
>   "status": "pending"
>   "date": "2023-02-15T00:00:00+0400",
> }'
> ```

> Response body
> ```
> {
>   "id": 1,
>   "userId": "string",
>   "products": ["string"],
>   "status": "pending"
>   "date": "2023-02-15T00:00:00+0400",
> }
> ```

  - DELETE `api/v2/orders/{orderId}` - delete existing order from database
    - Server should answer with status code 204 if the record was found and delete record
    - Server should answer with status code 400 and corresponding message if orderId is invalid (not uuid)
    - Server should answer with status code 404 and corresponding message if record with id === orderId doesn't exist

| Parameter | Type   | Required | Description |
|-----------|--------|----------|-------------|
| `orderId` | string | yes      | order's ID  |

> Request
> ```
> curl -X 'DELETE' \
> ‘api/v1/orders/1’ \
> ```

> Response body
> ```
> No Content
> ```   

### 5. Endpoint `api/v2/carts`:
  - GET `api/v2/carts` - get all carts
    - Server should answer with status code 200 and all carts records

> Request
> ```
> curl -X 'GET' \
> ‘api/v1/carts’ \
> ```

> Response body
> ```
> [{
>   "id": 1,
>   "userId": "string",
>   "products": ["string"],
> },
> {
>   "id": 2,
>   "userId": "string",
>   "products": ["string"],
> }]
> ```

- GET `api/v2/carts/{cartId}` - get one cart
  - Server should answer with status code 200 and record with id === cartId if it exists
  - Server should answer with status code 400 and corresponding message if cartId is invalid (not uuid)
  - Server should answer with status code 404 and corresponding message if record with id === cartId doesn't exist

| Parameter | Type   | Required | Description |
|-----------|--------|----------|-------------|
| `cartId`  | string | yes      | cart's ID   |

> Request
> ```
> curl -X 'GET' \
> ‘api/v1/carts/1’ \
> ```

> Response body
> ```
> {
>   "id": 1,
>   "userId": "string",
>   "products": ["string"],
> }
> ```

- POST `api/v2/carts` - create record about new cart and put it in database. The request body should contain the required information for creating a new cart.
  - Server should answer with status code 201 and newly created record
  - Server should answer with status code 400 and corresponding message if request body does not contain required fields

> Request
> ```
> curl -X 'POST' \
> ‘api/v1/carts/1’  \
> -d '{
>   "id": 1,
>   "userId": "string",
>   "products": ["string"],
> }'
> ```

> Response body
> ```
> {
>   "id": 1,
>   "userId": "string",
>   "products": ["string"],
> }
> ```

  - PUT `api/v2/carts/{cartsId}` - update existing cart. The request body should contain the updated information for the cart.
    - Server should answer with status code 200 and update the record
    - Server should answer with status code 400 and corresponding message if cartId is invalid (not uuid)
    - Server should answer with status code 404 and corresponding message if record with id === cartId doesn't exist

| Parameter | Type   | Required | Description |
|-----------|--------|----------|-------------|
| `cartId`  | string | yes      | cart's ID   |

> Request
> ```
> curl -X 'PUT' \
> ‘api/v1/carts/1’  \
> -d '{
>   "id": 1,
>   "userId": "string",
>   "products": ["string"],
> }'
> ```

> Response body
> ```
> {
>   "id": 1,
>   "userId": "string",
>   "products": ["string"],
> }
> ```

  - DELETE `api/v2/carts/{cartId}` - delete existing cart from database
    - Server should answer with status code 204 if the record was found and delete the record
    - Server should answer with status code 400 and corresponding message if cartId is invalid (not uuid)
    - Server should answer with status code 404 and corresponding message if record with id === cartId doesn't exist

| Parameter | Type   | Required | Description |
|-----------|--------|----------|-------------|
| `cartId`  | string | yes      | cart's ID   |

> Request
> ```
> curl -X 'DELETE' \
> ‘api/v1/carts/1’ \
> ```

> Response body
> ```
> No Content
> ```   

- Requests to non-existing endpoints are handled (server answer with status code 404 and message with error)
______

# Data Modeling



### Install 
Clone this repo with command
```sh
git clone https://github.com/suprugafad/shop_solvd.git
```

Go to project folder
```sh
cd shop-solvd
```

Install dependencies
```sh
npm install
```

### Run in docker container 
For running application in Docker container you should have docker installed on your system

Run app
```sh
docker compose up
```

Stop app
```sh
docker compose down
```

### Run as is 
Run command
```sh
node index.js
```

