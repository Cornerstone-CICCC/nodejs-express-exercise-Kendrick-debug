"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const uuid_1 = require("uuid");
const productsRouter = (0, express_1.Router)();
const products = [
    { id: "2ud83", product_name: 'Ps5', product_description: 'Sony playstation 5', product_price: 500 },
    { id: "87yed66", product_name: 'Xbox', product_description: 'Microsoft Xbox', product_price: 400 },
    { id: "87Y3E889", product_name: 'Switch', product_description: 'Nintendo Switch', product_price: 300 }
];
//Get all products
productsRouter.get("/products", (req, res) => {
    res.json(products);
});
// Post all products
productsRouter.post("/products", (req, res) => {
    const newProduct = {
        id: (0, uuid_1.v4)(),
        product_name: req.body.product_name,
        product_description: req.body.product_description,
        product_price: req.body.product_price
    };
    products.push(newProduct);
    res.status(201).json(newProduct);
});
//Get product by id
productsRouter.get("/products/:id", (req, res) => {
    const { id } = req.params;
    const product = products.find((product => product.id === id));
    if (!product) {
        res.status(404).send("Product not found");
        return;
    }
    res.status(200).json(product);
});
//update all products by id
productsRouter.put("/products/:id", (req, res) => {
    var _a, _b, _c;
    const { id } = req.params;
    const productFound = products.findIndex(product => product.id === id);
    if (productFound === -1) {
        res.status(404).send("Product not found");
        return;
    }
    const updateProduct = Object.assign(Object.assign({}, products[productFound]), { product_name: (_a = req.body.product_name) !== null && _a !== void 0 ? _a : products[productFound].product_name, product_description: (_b = req.body.product_description) !== null && _b !== void 0 ? _b : products[productFound].product_description, product_price: (_c = req.body.product_price) !== null && _c !== void 0 ? _c : products[productFound].product_price });
    products[productFound] = updateProduct;
    res.status(200).json(updateProduct);
});
//delete product by id
productsRouter.delete("/products/:id", (req, res) => {
    const { id } = req.params;
    const productFound = products.findIndex(product => product.id === id);
    if (productFound === -1) {
        res.status(404).send("Product not found");
        return;
    }
    products.splice(productFound, 1);
    res.status(200).send("Product successfully deleted");
});
exports.default = productsRouter;
