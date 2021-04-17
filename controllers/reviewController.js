import Reviews from "../models/reviewModel.js"

export const getAllReviews = async (req, res) => {
    try {
        const reviews = await Reviews.find()
        res.status(200).json({
            status: "success",
            data: {
                reviews
            }
        })
    } catch (error) {
        res.status(404).json({
            status: "failed",
            message: error.message
        })
    }
}

export const insertAllReviews = async (req, res) => {
    try {
        const reviews = await Reviews.insertMany(req.body)
        res.status(201).json({
            data: {
                reviews
            }
        })
    } catch (error) {
        res.status(404).json({ message: error.message })
    }
}

export const getReviewByTourId = async (req, res) => {
    const id = req.params.id
    try {
        const reviews = await Reviews.find({ tour: id }).sort("-reviewdAt -rating")
        res.status(200).json({
            status: "success",
            data: {
                reviews
            }
        })
    } catch (error) {
        res.status(404).json({ message: error.message })

    }
}

export const getFiveLatestReviews = async (req, res) => {
    try {
        const reviews = await Reviews.find().sort("-reviewdAt").limit(5)
        res.status(200).json({
            status: "success",
            data: {
                reviews
            }
        })
    } catch (error) {
        res.status(404).json({ message: error.message })

    }
}