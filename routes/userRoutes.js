import express from 'express'
import { createNewUser, getAdmins, loginUser, makeNewAdmin } from '../controllers/userController.js'

const router = express.Router()

router.get("/get-admins", getAdmins)
router.patch("/make-admin", makeNewAdmin)

router.post("/signup", createNewUser)
router.post("/login", loginUser)

router.route("/")
    .post()



export default router