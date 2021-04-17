import express from 'express'
import { getAllReviews, getFiveLatestReviews, getReviewByTourId, insertAllReviews } from '../controllers/reviewController.js'

const router = express.Router()

router.get("/get-five-latest", getFiveLatestReviews)

router.route("/").get(getAllReviews).post(insertAllReviews)

router.route("/:id").get(getReviewByTourId)


export default router