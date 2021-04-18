import express from 'express'
import { createNewReview, getAllReviews, getFiveLatestReviews, getReviewByTourId, getReviewByUser } from '../controllers/reviewController.js'

const router = express.Router()

router.get("/get-five-latest", getFiveLatestReviews)
router.get("/by-user/:user", getReviewByUser)

router.route("/").get(getAllReviews).post(createNewReview)

router.route("/:id").get(getReviewByTourId)


export default router