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

const express = require('express');
const dotenv = require('dotenv');

dotenv.config();

const app: Application = express();

app.use(express.json());

app.use("/api/users", userRouter);
app.use("/api/addresses", addressRouter);
app.use("/api/usersAddresses", userAddressRouter);
app.use("/api/auth", authRouter);
app.use("/api/cartItems", cartItemRouter);
app.use("/api/categories", categoryRouter);
app.use("/api/payments", paymentRouter);
app.use("/api/products", productRouter);
app.use("/api/productCategories", productCategoryRouter);

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