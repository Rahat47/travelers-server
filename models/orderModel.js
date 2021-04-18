import mongoose from 'mongoose'


const orderSchema = mongoose.Schema({
    userName: {
        type: String,
        required: [true, "The name of user Is required"],
        trim: true
    },
    userEmail: {
        type: String,
        required: [true, "User Email is required"]
    },
    tourId: {
        type: String,
        required: [true, "Tour ID is required for complete order"]
    },
    tourName: {
        type: String,
        trim: true
    },
    paymentId: String,
    totalAmmount: {
        type: Number,
        min: [1, "Total Price can't be less than 1"]
    },
    quantity: {
        type: Number,
        min: [1, "Quantity cannot be less than 1"],
        default: 1
    },
    orderedAt: {
        type: Date,
        default: Date.now()
    },
    orderStatus: {
        type: String,
        enum: {
            values: ["pending", "processing", "delivered"],
            message: "Order status can only be pending or processign or delivered"
        },
        default: "pending"
    }
})

const Orders = mongoose.model("Orders", orderSchema)

export default Orders