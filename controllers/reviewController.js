import Reviews from "../models/reviewModel.js"
import { catchAsync } from "../utils/catchAsync.js"

export const getAllReviews = catchAsync(async (req, res, next) => {
    const reviews = await Reviews.find()
    res.status(200).json({
        status: "success",
        data: {
            reviews
        }
    })
})

// export const insertAllReviews = catchAsync(async (req, res, next) => {
//     const reviews = await Reviews.insertMany(req.body)
//     res.status(201).json({
//         data: {
//             reviews
//         }
//     })
// })

export const getReviewByTourId = catchAsync(async (req, res, next) => {
    const id = req.params.id
    const reviews = await Reviews.find({ tour: id }).sort("-reviewdAt -rating")
    res.status(200).json({
        status: "success",
        data: {
            reviews
        }
    })
})

export const getFiveLatestReviews = catchAsync(async (req, res, next) => {
    const reviews = await Reviews.find().sort("-reviewdAt").limit(5)
    res.status(200).json({
        status: "success",
        data: {
            reviews
        }
    })
})

export const getReviewByUser = catchAsync(async (req, res, next) => {
    const user = req.params.user
    const reviews = await Reviews.find({ user })
    res.status(200).json({
        status: "success",
        data: {
            reviews
        }
    })
})


export const createNewReview = catchAsync(async (req, res, next) => {
    const review = await Reviews.create(req.body)
    res.status(200).json({
        status: "success",
        data: {
            review
        }
    })
})