import express from 'express'
import { createNewUser, loginUser } from '../controllers/userController.js'

const router = express.Router()

router.post("/signup", createNewUser)
router.post("/login", loginUser)

router.route("/")
    .post()



export default router