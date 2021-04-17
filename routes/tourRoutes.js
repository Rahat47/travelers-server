import express from 'express'
import { getAllTours, getBestTour, getSinleTour } from '../controllers/tourController.js'

const router = express.Router()
router.get("/best-tours", getBestTour)

router.route("/").get(getAllTours)

router.route("/:id").get(getSinleTour)



export default router