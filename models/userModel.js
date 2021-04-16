import mongoose from 'mongoose'
import validator from 'validator'
import bcrypt from 'bcryptjs'

const userSchema = mongoose.Schema({
    fullName: {
        type: String,
        required: [true, "A user must have a name"]
    },
    email: {
        type: String,
        required: [true, "A user must have an email"],
        unique: [true, "Looks like you already have an account. Please log in."],
        validate: [validator.isEmail, "Please provide a valid email"],
        trim: true,
        lowercase: true
    },
    password: {
        type: String,
        required: [true, "A user must have a password"],
    },
    confirmPassword: {
        type: String,
        required: [true, "You must confirm your password"],
        validate: {
            //?This only works on Save & Create !!!
            validator: function (el) {
                return el === this.password
            },
            message: "Password and Confirm Password Does Not Match!!!"
        }
    },
    image: Buffer
})


userSchema.pre("save", async function (next) {
    if (!this.isModified("password")) return next()

    this.password = await bcrypt.hash(this.password, 12)
    this.confirmPassword = undefined
    next()

})


userSchema.methods.correctPassword = async function (candidatePassword, userPassword) {
    return await bcrypt.compare(candidatePassword, userPassword)
}

const Users = mongoose.model("Users", userSchema)

export default Users