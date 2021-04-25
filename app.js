import express from 'express'
import cors from 'cors'
import morgan from 'morgan'
import tourRoutes from './routes/tourRoutes.js'
import userRoutes from './routes/userRoutes.js'
import reviewRoutes from './routes/reviewRoutes.js'
import orderRoutes from './routes/orderRoutes.js'
import { stripeGateway } from './stripe.js'
import AppError from './utils/appError.js'
import { handleError } from './controllers/errorController.js'
//Declare express app
const app = express()

//Essential Middlewares
app.use(cors())
app.use(morgan("dev"))
app.use(express.json({ limit: "10mb", extended: true }))
app.use(express.urlencoded({ limit: "10mb", extended: true }))
app.use(express.static("public"))

//routes
app.use("/tours", tourRoutes)
app.use("/users", userRoutes)
app.use("/reviews", reviewRoutes)
app.use("/orders", orderRoutes)


app.get("/", (req, res) => {
    res.send("Welcome to Travelers API")
})

app.post("/chekcout/stripe", stripeGateway)


app.all("*", (req, res, next) => {
    next(new AppError(`Can't find ${req.originalUrl} on this server!`, 404))
})

//Global Error Handler
app.use(handleError)


export default app