import mongoose from 'mongoose'

const tourSchema = mongoose.Schema({
    title: {
        type: String,
        required: [true, "A tour must have a title."],
        minlength: [10, "A tour title must be larger than 10 characters"],
        trim: true,
        unique: true
    }
})


const Tours = mongoose.model("Tours", tourSchema)

export default Tours