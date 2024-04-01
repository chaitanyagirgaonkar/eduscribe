import connectDB from "./db/index.js";
import 'dotenv/config'
import { app } from './app.js'
dotenv.config({
    path: './.env'
})

connectDB()
    .then(() => {
        app.listen(process.env.PORT , () => {
            console.log(`Server is running at port : ${process.env.PORT}`);
        })
    })
    .catch((err) => {
        console.log("MONGO db connection failed !!!", err)
    })