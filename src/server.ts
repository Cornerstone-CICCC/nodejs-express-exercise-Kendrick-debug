import express, { Request, Response, NextFunction } from 'express'
import productRouter from './routes/product.route'

const app = express()

app.use(express.json())
app.use('/', productRouter)

// Error Handling for 404
app.use((req: Request, res: Response, next: NextFunction) => {
    res.status(404).send("404 Not Found")
})

// Catch-all Error Handler
app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
    console.error(err.stack)
    res.status(500).send("Something went wrong!")
})

// Server
const PORT = 3500
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`)
})