import express from 'express'
import cors from 'cors'
import morgan from 'morgan'
import tourRoutes from './routes/tourRoutes.js'
import userRoutes from './routes/userRoutes.js'

//Declare express app
const app = express()

//Essential Middlewares
app.use(cors())
app.use(morgan("dev"))
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(express.static("public"))

//routes
app.use("/tours", tourRoutes)
app.use("/users", userRoutes)


app.get("/", (req, res) => {
    res.send("Welcome to Travelers API")
})


export default app