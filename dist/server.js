"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const product_route_1 = __importDefault(require("./routes/product.route"));
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use('/', product_route_1.default);
// Error Handling for 404
app.use((req, res, next) => {
    res.status(404).send("404 Not Found");
});
// Catch-all Error Handler
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send("Something went wrong!");
});
// Server
const PORT = 3500;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
