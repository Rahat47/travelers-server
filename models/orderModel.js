import mongoose from 'mongoose'


const orderSchema = mongoose.Schema({
    userName: {
        type: String,
        required: [true, "The name of user Is required"]
    },
    userEmail: {
        type: String,
        required: [true, "User Email is required"]
    },
    totalAmmount: Number,
    orderedAt: {
        type: Date,
        default: Date.now()
    },
    userAddress: String,
    orderStatus: {
        type: String,
        enum: {
            values: ["ordered", "processing", "delivered"],
            message: "Order status can only be ordered or processign or delivered"
        },
        default: "ordered"
    }
})

const Orders = mongoose.model("Orders", orderSchema)

export default Orders