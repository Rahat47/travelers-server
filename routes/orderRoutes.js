import express from 'express'
import { createNewOrder, getAllOrders, getOrdersByEmail, updateOrder } from '../controllers/orderController.js'

const router = express.Router()


router.route("/").get(getAllOrders).post(createNewOrder)

router.get("/by-email/:email", getOrdersByEmail)

router.route("/:id").patch(updateOrder)


export default router