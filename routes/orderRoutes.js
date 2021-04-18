import express from 'express'
import { createNewOrder, getAllOrders, updateOrder } from '../controllers/orderController.js'

const router = express.Router()


router.route("/").get(getAllOrders).post(createNewOrder)

router.route("/:id").patch(updateOrder)


export default router