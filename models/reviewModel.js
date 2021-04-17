import mongoose from 'mongoose'


const reviewSchema = mongoose.Schema({
    review: {
        type: String,
        required: [true, "You must give your review."]
    },
    rating: {
        type: Number,
        required: [true, "A rating is required"],
        min: [1, "Rating must be at least 1"],
        max: [5, "Rating Cannot be more than 5"]
    },
    tour: String,
    user: String,
    reviewdAt: {
        type: Date,
        default: Date.now()
    },
    userImage: {
        type: String,
        default: `https://avatars.dicebear.com/api/avataaars/${Math.random()}.svg`
    }
})


const Reviews = mongoose.model("Reviews", reviewSchema)

export default Reviews