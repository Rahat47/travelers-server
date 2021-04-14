import Tours from "../models/tourModel";

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