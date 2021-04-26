import Orders from "../models/orderModel.js";
import Tour from "../models/tourModel.js";
import AppError from "../utils/appError.js";
import { catchAsync } from "../utils/catchAsync.js";


export const createNewOrder = catchAsync(async (req, res, next) => {
    const orderDetails = req.body

    const selectedTour = await Tour.findById(orderDetails.tourId)

    if (!selectedTour) {
        return next(new AppError("No tours selected. Failed to create an order", 400))
    }

    orderDetails.totalAmmount = selectedTour.price
    orderDetails.tourName = selectedTour.name

    const order = await Orders.create(orderDetails)
    res.status(200).json({
        status: "success",
        data: {
            order
        }
    })
}
)
export const getAllOrders = catchAsync(async (req, res, next) => {
    const orders = await Orders.find()
    res.status(200).json({
        status: "success",
        total_data: orders.length,
        data: {
            orders
        }
    })
})


export const updateOrder = catchAsync(async (req, res, next) => {
    const id = req.params.id
    const order = await Orders.findByIdAndUpdate(id, req.body)
    res.status(200).json({
        status: "success",
        message: "Order Updated Successfully",
        data: {
            order
        }
    })
})

export const getOrdersByEmail = catchAsync(async (req, res, next) => {
    const email = req.params.email
    const orders = await Orders.find({ userEmail: email })
    res.status(200).json({
        status: "success",
        total_data: orders.length,
        data: {
            orders
        }
    })

})