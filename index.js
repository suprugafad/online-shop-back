const express = require('express');
const authController = require('./controllers/authController');
const authMW = require('./middleware/authMW');
const user = require('./controllers/userController');
const product = require('./controllers/productController')

const PORT = process.env.PORT || 3000;

const app = express();
app.use(express.json());

app.post('/reg', authController.regUser);
app.post('/login', authMW, authController.logUser);

app.get('/users', user.getUsers);
app.get('/users/:id', user.getUserById);
app.put('/users/:id', user.updateUser);
app.delete('/users/:id', user.deleteUser);

app.get('/products', product.getProducts);
app.post('/products', product.postProduct);

const start = () => {
    try {
        app.listen(PORT, () => console.log(`server started on port ${PORT}`));
    } catch (e) {
        console.log(e);
    }
}

start();

