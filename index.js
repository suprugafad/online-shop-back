const express = require('express');
const controller = require('./controllers/authController');
const authMW = require('./middleware/authMW')

const PORT = process.env.PORT || 3000;

const app = express();
app.use(express.json());
app.post('/auth', authMW, controller.auth);

const start = () => {
    try {
        app.listen(PORT, () => console.log(`server started on port ${PORT}`));
    } catch (e) {
        console.log(e);
    }
}

start();

