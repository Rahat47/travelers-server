import Tours from "../models/tourModel.js";
import { catchAsync } from "../utils/catchAsync.js";
import AppError from '../utils/appError.js'

export const getAllTours = catchAsync(async (req, res, next) => {
    const tours = await Tours.find()
    res.status(200).json({
        status: "Success",
        tourCount: tours.length,
        data: {
            tours
        }
    })
})

export const getBestTour = catchAsync(async (req, res, next) => {
    const data = await Tours.find().sort("-ratingsAverage").limit(2)
    res.status(200).json({
        status: "success",
        data: {
            data
        }
    })
})

export const getSinleTour = catchAsync(async (req, res, next) => {
    const tour = await Tours.findById(req.params.id)
    if (!tour) {
        return next(new AppError("There is no tour by this name in the Database", 404))
    }

    res.status(200).json({
        status: "success",
        data: {
            tour
        }
    })
})

export const insertNewTour = catchAsync(async (req, res, next) => {
    const tourData = req.body

    const tour = await Tours.create(tourData)
    res.status(201).json({
        status: "success",
        data: {
            tour
        }
    })
})

export const deleteTour = catchAsync(async (req, res, next) => {
    const id = req.params.id
    await Tours.findByIdAndDelete(id)
    res.status(204).json({ message: "Tour Deleted Successfully" })
})

// export const uploadAllTours = catchAsync(async (req, res, next) => {
//     const tours = req.body
//     const data = await Tours.insertMany(tours)
//     res.status(201).json({ data })
// })