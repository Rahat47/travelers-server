import Orders from "../models/orderModel.js";
import Tour from "../models/tourModel.js";

export const createNewOrder = async (req, res) => {
    const orderDetails = req.body

    const selectedTour = await Tour.findById(orderDetails.tourId)
    orderDetails.totalAmmount = selectedTour.price
    orderDetails.tourName = selectedTour.name

    try {
        const order = await Orders.create(orderDetails)
        res.status(200).json({
            status: "success",
            data: {
                order
            }
        })
    } catch (error) {
        res.status(400).json({ message: error.message })
    }
}

export const getAllOrders = async (req, res) => {
    try {
        const orders = await Orders.find()
        res.status(200).json({
            status: "success",
            data: {
                orders
            }
        })
    } catch (error) {
        res.status(400).json({ message: error.message })

    }
}


export const updateOrder = async (req, res) => {
    const id = req.params.id
    try {
        const order = await Orders.findByIdAndUpdate(id, req.body)
        res.status(200).json({
            status: "success",
            data: {
                order
            }
        })
    } catch (error) {
        res.status(400).json({ message: error.message })

    }
}