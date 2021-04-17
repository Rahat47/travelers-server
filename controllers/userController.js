import Users from "../models/userModel.js"

export const createNewUser = async (req, res) => {
    const userData = req.body
    try {
        const newUser = await Users.create(userData)
        res.status(201).json({
            status: "success",
            data: {
                user: newUser
            }
        })
    } catch (error) {
        console.log(error);

        if (error.code === 11000) {
            return res.status(400).json({ message: `${error.keyValue.email} already exists in our system. Please log in.` })
        }

        if (error._message === "Users validation failed") {
            const errors = Object.values(error.errors).map(er => er.message)

            const message = `Invalid Input Data. ${errors.join(". ")}`
            return res.status(400).json({ message })
        }
        res.status(400).json({ message: error.message })
    }
}


export const loginUser = async (req, res) => {
    const email = req.body.email
    const password = req.body.password

    try {
        const user = await Users.findOne({ email })
        if (!user) { throw new Error("No user found. Sign up first.") }

        if (!await user.correctPassword(password, user.password)) {
            throw new Error("Password is wrong. Please enter the correct password.")
        }

        res.status(200).json({
            status: "success",
            data: {
                user
            }
        })

    } catch (error) {
        res.status(404).json({ message: error.message })
    }
}


export const getAdmins = async (req, res) => {
    try {
        const admins = await Users.find({ role: "admin" }).sort("-joinedAt")

        res.status(200).json({
            status: "success",
            data: {
                admins
            }
        })
    } catch (error) {
        res.status(404).json({ message: error.message })

    }
}