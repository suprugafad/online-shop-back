# API documentation
## Content
1. [Description](#descr)
2. [Technical requirements](#tech)
3. [Base URL](#url)
4. [Implementation details](#impl) <br>
   4.1 [Endpoint api/v1/users](#users) <br>
   4.2 [Endpoint api/v1/products](#prod) <br>
   4.3 [Endpoint api/v1/orders](#orders) <br>
   4.4 [Endpoint api/v1/carts](#carts)
5. [Objects](#obj)
6. [Install](#inst)
7. [Run](#run)

______

## Description <a name="descr"></a>
This project is a clothing shop. There are two roles of users: admin and customer. This application has the ability to add, update, delete and get information about users, products, carts and orders.
_____
## Technical requirements <a name="tech"></a>
- Programming language - Javascript
- Database - MongoDB
- Docker
_____
## Base URL <a name="url"></a>
`http://localhost:3000`
_____

## Implementation details <a name="imple"></a>
### 1.  Endpoint api/v1/users: <a name="users"></a>
  - GET api/v1/users - get all users
      - Server should answer with status code 200 and all users records.

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
  - GET api/v1/users/{userId} - get one user by ID
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

  - GET api/v1/users?name=:name - get a list of users whose name partially matches the specified parameter.
    - Server should answer with status code 200 and array of records with name === name if it exists
    - Server should answer with status code 400 and corresponding message if name is invalid (not uuid)
    - Server should answer with status code 404 and corresponding message if record with name === name doesn't exist


| Parameter | Type   | Required | Description                                 |
|-----------|--------|----------|---------------------------------------------|
| `name`    | string | Yes      | Part of the name of the user to search for. |

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

  - POST api/v1/users - create record about new user and put it in database. The request body should contain the required information for creating a new product, such as name, price, description and image.
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

  - PUT api/v1/users/{userId} - update existing user. The request body should contain the updated information for the product.
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

  - DELETE api/v1/users/{userId} - delete existing user from database
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

### 2. Endpoint api/v1/products: <a name="prod"></a>
  - GET api/v1/products - get all products
    - Server should answer with status code 200 and all products records

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

  - GET api/v1/products/{productId} - get one product
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

  - GET api/v1/products?category=:category - get a list of products which title partially matches the specified parameter.
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

  - POST api/v1/products - create record about new product and put it in database. The request body should contain the required information for creating a new product, such as name, price, description and image.
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

  - PUT api/v1/products/{productId} - update existing product. The request body should contain the updated information for the product.
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

  - DELETE api/v1/products/{productId} - delete existing product from database
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

### 3. Endpoint api/orders: <a name="orders"></a>
  - GET api/v1/orders - get all orders
    - Server should answer with status code 200 and all orders records

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

  - GET api/v1/orders/{orderId} - get one order
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

  - GET api/v1/orders?start_date=:start_date&end_date=:end_date - get a list of orders between the specified start and end dates.
    - Server should answer with status code 200 and array of records with start_date < date < end_date if it exists
    - Server should answer with status code 400 and corresponding message if date is invalid (not uuid)
    - Server should answer with status code 404 and corresponding message if record with start_date < date < end_date doesn't exist

| Parameter      | Type   | Required    | Description                                                              |
|----------------|--------|-------------|--------------------------------------------------------------------------|
| `start_date`   | date   | Yes         | The start date of the period to search for. Format should be YYYY-MM-DD  |
| `end_date`     | date   | Yes         | The end date of the period to search for. Format should be YYYY-MM-DD    |


> Request:
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

  - GET api/v1/orders?start_date=:start_date&end_date=:end_date&status=:status - get a list of orders between the specified start and end dates, and with the specified status.
    - Server should answer with status code 200 and array of records with start_date < date < end_date && status === status if it exists
    - Server should answer with status code 400 and corresponding message if date is invalid (not uuid)
    - Server should answer with status code 404 and corresponding message if record with start_date < date < end_date && status === status doesn't exist

| Parameter    | Type   | Required | Description                                                             |
|--------------|--------|----------|-------------------------------------------------------------------------|
| `start_date` | date   | Yes      | The start date of the period to search for. Format should be YYYY-MM-DD |
| `end_date`   | date   | Yes      | The end date of the period to search for. Format should be YYYY-MM-DD   |
| `status`     | string | Yes      | The status of the orders to search for                                  |


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
>     "products": "string",
>     "date": "2023-02-11",
>     "status": "pending"
>   } ] 
> ```

  - POST api/v1/orders - create record about new order and put it in database. The request body should contain the required information for creating a new order.
    - Server should answer with status code 201 and newly created record
    - Server should answer with status code 400 and corresponding message if request body does not contain required fields

> Request
> ```
> curl -X 'POST' \
> ‘api/v1/orders/1’  \
> -d '{
>   "id": 1,
>   "userId": "string",
>   "products": "string",
>   "status": "pending"
>   "date": "2023-02-15T00:00:00+0400",
> }'
> ```

> Response body
> ```
> {
>   "id": 1,
>   "userId": "string",
>   "products": "string",
>   "status": "pending",
>   "date": "2023-02-15T00:00:00+0400",
> }
> ```

  - PUT api/v1/orders/{orderId} - update existing order. The request body should contain the updated information for the order.
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
>   "products": "string",
>   "status": "pending"
>   "date": "2023-02-15T00:00:00+0400",
> }'
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

  - DELETE api/v1/orders/{orderId} - delete existing order from database
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

### 4. Endpoint api/carts: <a name="carts"></a>
  - GET api/v1/carts - get all carts
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
>   "products": "string",
> },
> {
>   "id": 2,
>   "userId": "string",
>   "products": "string",
> }]
> ```

- GET api/v1/carts/{cartId} - get one cart
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
>   "products": "string",
> }
> ```

- POST api/v1/carts - create record about new cart and put it in database. The request body should contain the required information for creating a new cart.
  - Server should answer with status code 201 and newly created record
  - Server should answer with status code 400 and corresponding message if request body does not contain required fields

> Request
> ```
> curl -X 'POST' \
> ‘api/v1/carts/1’  \
> -d '{
>   "id": 1,
>   "userId": "string",
>   "products": "string",
> }'
> ```

> Response body
> ```
> {
>   "id": 1,
>   "userId": "string",
>   "products": "string",
> }
> ```

  - PUT api/v1/carts/{cartsId} - update existing cart. The request body should contain the updated information for the cart.
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
>   "products": "string",
> }'
> ```

> Response body
> ```
> {
>   "id": 1,
>   "userId": "string",
>   "products": "string",
> }
> ```

  - DELETE api/v1/carts/{cartId} - delete existing cart from database
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
<a name="obj"></a>
Users are stored as objects that have the following properties:
  - id — unique identifier (string, uuid) generated on server side
  - name — user's name (string, required)
  - password — user's age (number, required)
  - email — user’s email address (string, unique, required)
  - isAdmin — if user is admin - true, if user is customer - false (boolean, required)

Products are stored as objects that have the following properties:
  - id — unique identifier (string, uuid) generated on server side
  - title — product's title (string, required)
  - description — product's description (string, required)
  - category — product's category (string, required)
  - brand — product's brand (string, required)
  - price — product's price (number, required)
  - image — product's image (string, required)
  - modelId — product’s model (string, uuid)

Models are stored as objects that have the following properties:
  - id — unique identifier (string, uuid) generated on server side
  - size — model's size (string, required)
  - count — count of items (number, required)

Orders are stored as objects that have the following properties:
  - id — unique identifier (string, uuid) generated on server side
  - userId — user's id (string, uuid)
  - products — list of products (array of strings or empty array, required)
  - status - product's status (string, required)
  - date — list of products (date, required)

Carts are stored as objects that have the following properties:
- id — unique identifier (string, uuid) generated on server side
- userId — user's id (string, uuid)
- products — products that are in cart (array of strings or empty array, required)
______

### Install <a name="inst"></a>
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

### Run in docker container <a name="run"></a>
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

