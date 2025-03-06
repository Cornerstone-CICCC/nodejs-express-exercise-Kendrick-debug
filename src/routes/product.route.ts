import { Router, Request, Response } from "express";
import { v4 as uuidv4 } from 'uuid'
import {Products} from '../types/product'




const productsRouter = Router()

const products: Products[] = [
    {id: "2ud83", product_name: 'Ps5', product_description: 'Sony playstation 5', product_price: 500},
    {id: "87yed66", product_name: 'Xbox', product_description: 'Microsoft Xbox', product_price: 400},
    {id: "87Y3E889", product_name: 'Switch', product_description: 'Nintendo Switch', product_price: 300}
    
]


//Get all products
productsRouter.get("/products", (req: Request, res: Response) => {
    res.json(products)

})

// Post all products
productsRouter.post("/products", (req: Request<{}, {}, Omit<Products, 'id'>>, res: Response) => {
    const newProduct: Products = {
        id: uuidv4(),
        product_name: req.body.product_name,
        product_description: req.body.product_description,
        product_price: req.body.product_price
    }
    products.push(newProduct)
    res.status(201).json(newProduct)
})


//Get product by id
productsRouter.get("/products/:id", (req: Request<{id: String}>, res: Response) => {
    const {id} = req.params
    const product = products.find((product => product.id === id))
    if (!product) {
        res.status(404).send("Product not found")
        return
    }
    res.status(200).json(product)
})


//update all products by id
productsRouter.put("/products/:id", (req: Request<{ id: string }, {}, Partial<Products>>, res: Response) => {
    const { id } = req.params
    const productFound = products.findIndex(product => product.id === id)
    if (productFound === -1) {
        res.status(404).send("Product not found")
        return
    }
    const updateProduct: Products = {
        ...products[productFound],
        product_name: req.body.product_name ?? products[productFound].product_name,
        product_description: req.body.product_description ?? products[productFound].product_description,
        product_price: req.body.product_price ?? products[productFound].product_price
    }
    products[productFound] = updateProduct
    res.status(200).json(updateProduct)
})



//delete product by id
productsRouter.delete("/products/:id", (req: Request, res: Response) => {
    const { id } = req.params
    const productFound = products.findIndex(product => product.id === id)
    if (productFound === -1) {
        res.status(404).send("Product not found")
        return
    }
    products.splice(productFound, 1)
    res.status(200).send("Product successfully deleted")
})

export default productsRouter
