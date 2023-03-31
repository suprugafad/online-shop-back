import authController from './controllers/authController';
import authMW from './middleware/authMW';
import userController from './controllers/userController';
import productController from './controllers/productController';
import { Application } from "express";
const express = require('express');

const dotenv = require('dotenv');
dotenv.config();

const PORT: string | number = process.env.PORT || 3000;

const app: Application = express();
app.use(express.json());

app.post('/reg', authController.regUser);
app.post('/login', authMW, authController.logUser);

app.get('/users', userController.getUsers);
app.get('/users/:id', userController.getUserById);
app.put('/users/:id', userController.updateUser);
app.delete('/users/:id', userController.deleteUser);

app.get('/products', productController.getProducts);
app.post('/products', productController.postProduct);

app.post('/newPassword', authMW, authController.changePassword);

const start = (): void => {
    try {
        app.listen(PORT, (): void => console.log(`server started on port ${PORT}`));
    } catch (e) {
        console.log(e);
    }
};

start();


