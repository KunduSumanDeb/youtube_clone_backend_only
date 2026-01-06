import connectDB from "./db/index.js";
import dotenv from "dotenv"; //requir('dotenv').config({path: './env'})

dotenv.config({
    path: './env'
});
connectDB();












/*
import express from "express";
const app = express();

( async () => {
    try 
    {
        await mongoose.connect(`${process.env.MONGODB_URL}/${ DB_NAME }`)
        app.on("error",(error) => {
            console.log("Error connecting to MongoDB:", error);
            throw error
        })
        app.listen(process.env.PORT,() => {
            console.log(`App is listening on port ${process.env.PORT}`)
        })
    }
    catch (error) 
    {
        console.error("Error connecting to MongoDB:", error);
        throw error
    }
})()

*/