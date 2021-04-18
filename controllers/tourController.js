import { response } from "express";
import Tours from "../models/tourModel.js";

export const getAllTours = async (req, res) => {
    try {
        const tours = await Tours.find()
        res.status(200).json({
            status: "Success",
            tourCount: tours.length,
            data: {
                tours
            }
        })
    } catch (error) {
        res.status(404).json({
            status: "failed",
            message: error.message,
            error
        })
    }
}

export const getBestTour = async (req, res) => {
    try {
        const data = await Tours.find().sort("-ratingsAverage").limit(2)
        res.status(200).json({
            status: "success",
            data: {
                data
            }
        })
    } catch (error) {
        res.status(404).json({
            status: "failed",
            message: error.message,
            error
        })
    }
}

export const getSinleTour = async (req, res) => {
    try {
        const tour = await Tours.findById(req.params.id)
        if (!tour) {
            return res.status(404).json({ message: "No Tours Found!!!!!!" })
        }

        res.status(200).json({
            status: "success",
            data: {
                tour
            }
        })
    } catch (error) {
        res.status(404).json({ message: error.message })
    }
}

export const insertNewTour = async (req, res) => {
    const tourData = req.body

    try {
        const tour = await Tours.create(tourData)
        res.status(201).json({
            status: "success",
            data: {
                tour
            }
        })
    } catch (error) {
        res.status(400).json({
            status: "failed",
            message: error.message,
            error
        })
    }
}

// export const uploadAllTours = async (req, res) => {
//     const tours = req.body
//     try {
//         const data = await Tours.insertMany(tours)
//         res.status(201).json({ data })
//     } catch (error) {
//         res.status(500).json({
//             status: "failed",
//             message: error.message,
//             error
//         })
//     }
// }