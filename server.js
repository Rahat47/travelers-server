import app from './app.js'
import mongoose from "mongoose"


const dburi = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.pudgr.mongodb.net/${process.env.DB_NAME}?retryWrites=true&w=majority`


mongoose.connect(dburi, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: true
}).then(() => {
    console.log("Database Connected and Running")
}).catch(err => {
    console.log(err);
})

app.listen(process.env.PORT, () => {
    console.log(`App running at port ${process.env.PORT}`);
})