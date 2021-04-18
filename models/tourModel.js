import mongoose from 'mongoose'
import slugify from 'slugify'
const tourSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "A tour must have a name!"],
        unique: true,
        trim: true,
        maxlength: [50, "A tour name must contained within 40 characters"],
        minlength: [10, "A tour name must have more than 10 characters"],
    },
    slug: String,
    duration: {
        type: Number,
        required: [true, "A tour must have a duration!"]
    },
    maxGroupSize: {
        type: Number,
        required: [true, "A tour must have a Group Size!"]
    },
    difficulty: {
        type: String,
        required: [true, "A tour must have a Difficulty!"],
        enum: {
            values: ["easy", "medium", "difficult"],
            message: "Difficulty can only be Easy Or Medium Or Difficult"
        }
    },
    ratingsAverage: {
        type: Number,
        default: 4.5,
        min: [1, "Rating must be avobe 1.0"],
        max: [5, "Rating cannot exceed 5.0"]
    },
    ratingsQuantity: {
        type: Number,
        default: 0
    },
    price: {
        type: Number,
        required: [true, "A tour must have a price!"]
    },
    summary: {
        type: String,
        trim: true,
        required: [true, "A Tour must have a short summary"]
    },
    description: {
        type: String,
        trim: true
    },
    imageCover: {
        type: String,
        required: [true, "A tour must have a cover Image"]
    },
    createdAt: {
        type: Date,
        default: Date.now(),
        select: false
    },
    startDates: {
        type: [Date],
        required: [true, "A start date must be provided"]
    },
    secretTour: {
        type: Boolean,
        default: false
    },
    tourGuide: String,
    startLocation: {
        type: String,
        required: [true, "A tour must have a start location"]
    },
})

//DOCUMENT MIDDLEWARE, runs before save and create command
tourSchema.pre("save", function (next) {
    this.slug = slugify(this.name, { lower: true })
    next()
})

const Tour = mongoose.model('Tour', tourSchema)


export default Tour
