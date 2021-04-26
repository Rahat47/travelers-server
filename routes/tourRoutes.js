import express from 'express'
import { deleteTour, getAllTours, getBestTour, getSinleTour, insertNewTour } from '../controllers/tourController.js'

const router = express.Router()
router.get("/best-tours", getBestTour)

router.route("/")
    .get(getAllTours)
    .post(insertNewTour)

router.route("/:id")
    .get(getSinleTour)
    .delete(deleteTour)



export default router