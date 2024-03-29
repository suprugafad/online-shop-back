import { Application } from "express";
import userRouter from "./routers/userRouter";
import addressRouter from "./routers/addressRouter"
import userAddressRouter from "./routers/userAddressRouter";
import authRouter from "./routers/authRouter";
import cartItemRouter from "./routers/cartItemRouter";
import categoryRouter from "./routers/categoryRouter";
import paymentRouter from "./routers/paymentRouter";
import productRouter from "./routers/productRouter";
import productCategoryRouter from "./routers/productCategoryRouter";
import config from "./config/config";
import cartRouter from "./routers/cartRouter";
import orderRouter from "./routers/orderRouter";
import reviewRouter from "./routers/reviewRouter";
import favoriteItemRouter from "./routers/favoriteItemRouter";

const path = require("path");
const cors = require("cors");
const express = require('express');
const cookieParser = require('cookie-parser');
const dotenv = require('dotenv');

dotenv.config();

const app: Application = express();

app.use('/assets', express.static(path.join(__dirname, 'assets')));

app.use(cors({
    origin: 'http://localhost:3000',
    credentials: true,
}));
app.use(cookieParser());

app.use(express.json({ limit: '100mb' }));
app.use(express.urlencoded({ limit: '100mb', extended: true }));

app.use("/api/users", userRouter);
app.use("/api/addresses", addressRouter);
app.use("/api/usersAddresses", userAddressRouter);
app.use("/api/auth", authRouter);
app.use("/api/carts", cartRouter);
app.use("/api/cartItems", cartItemRouter);
app.use("/api/favoriteItems", favoriteItemRouter);
app.use("/api/categories", categoryRouter);
app.use("/api/payments", paymentRouter);
app.use("/api/products", productRouter);
app.use("/api/productCategories", productCategoryRouter);
app.use("/api/orders", orderRouter);
app.use("/api/reviews", reviewRouter);

const start = async (): Promise<void> => {
    try {
        await app.listen(config.port);
        console.log(`Server running in ${config.env} mode on port ${config.port}`);
    } catch (error) {
        console.error(error);
        process.exit(1);
    }
};

start().catch((error) => {
    console.error("Error starting server:", error);
    process.exit(1);
});