import Users from "../models/userModel.js"
import AppError from "../utils/appError.js"
import { catchAsync } from "../utils/catchAsync.js"

export const createNewUser = catchAsync(async (req, res, next) => {
    const userData = req.body
    const newUser = await Users.create(userData)
    res.status(201).json({
        status: "success",
        data: {
            user: newUser
        }
    })
})


export const loginUser = catchAsync(async (req, res, next) => {
    const email = req.body.email
    const password = req.body.password

    const user = await Users.findOne({ email })
    if (!user) next(new AppError("No user found by this email.", 404))

    if (!await user.correctPassword(password, user.password)) {
        return next(new AppError("Your password is incorrect.", 400))
    }

    res.status(200).json({
        status: "success",
        data: {
            user
        }
    })
})


export const getAdmins = catchAsync(async (req, res, next) => {
    const admins = await Users.find({ role: "admin" }).sort("-joinedAt")

    res.status(200).json({
        status: "success",
        data: {
            admins
        }
    })
})

export const makeNewAdmin = catchAsync(async (req, res, next) => {
    const email = req.body.email
    const user = await Users.findOne({ email })
    if (!user) {
        return next(new AppError("Looks like this user is not present in our system. Please Sign up first", 400))
    }

    if (user.role === "admin") {
        return next(new AppError("User is already an Admin", 400))
    }

    user.role = "admin"
    await user.save({ validateBeforeSave: false })

    res.status(200).json({
        status: "success",
        data: {
            user
        }
    })
})