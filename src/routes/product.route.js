"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const productsRouter = (0, express_1.Router)();
const products = [
    { id: 10, product_name: 'Ps5', product_description: 'Sony playstation 5', product_price: 500 },
    { id: 20, product_name: 'Xbox', product_description: 'Microsoft Xbox', product_price: 400 },
    { id: 30, product_name: 'Switch', product_description: 'Nintendo Switch', product_price: 300 }
];
//Get all products
productsRouter.get("/products", (req, res) => {
    res.json(products);
});
