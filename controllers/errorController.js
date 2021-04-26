import AppError from "../utils/appError.js"

//!Errors
const handleCastErrorDB = (err) => {
    const message = `Invalid ${err.path}: /${err.value}/.`
    return new AppError(message, 400)
}

const handleDuplicateErrorDB = (err) => {
    const message = `Duplicate Value: "${err.keyValue.name}" detected. Please Provide a unique value for this field.`
    return new AppError(message, 400)
}

const handleValidationErrorDB = (err) => {
    const errors = Object.values(err.errors).map(el => el.message)

    const message = `Invalid input data. ${errors.join(". ")}`
    return new AppError(message, 400)
}

const sendErrorDev = (err, res) => {

    res.status(err.statusCode).json({
        status: err.status,
        message: err.message,
        stack: err.stack,
        error: err
    })
}

const sendErrorProd = (err, res) => {
    if (err.isOperational) {
        res.status(err.statusCode).json({
            status: err.status,
            message: err.message,
        })
    } else {
        console.error(err)

        res.status(500).json({
            status: "error",
            message: "Something went wrong."
        })
    }


}

export const handleError = (err, req, res, next) => {
    err.statusCode = err.statusCode || 500
    err.status = err.status || "error"

    if (process.env.NODE_ENV === 'development') {
        sendErrorDev(err, res)
    } else if (process.env.NODE_ENV === 'production') {
        let error = { ...err }
        if (error.kind === "ObjectId") error = handleCastErrorDB(error)

        if (error.code === 11000) error = handleDuplicateErrorDB(error)

        if (error.errors && Object.values(error.errors).length > 0) error = handleValidationErrorDB(error)

        sendErrorProd(error, res)
    }


}