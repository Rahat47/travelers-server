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