import express from 'express'
import { createNewOrder, getAllOrders } from '../controllers/orderController.js'

const router = express.Router()


router.route("/").get(getAllOrders).post(createNewOrder)


export default router