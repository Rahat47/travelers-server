import express from 'express'
import { getAllTours, getBestTour } from '../controllers/tourController.js'

const router = express.Router()

router.route("/").get(getAllTours)

router.get("/best-tours", getBestTour)


export default router