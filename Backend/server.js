import express from "express";
import dotenv from 'dotenv';
import userRouter from "./routes/userRoutes.js";
import { notFound,errorHandler } from "./middleware/errorMiddleware.js";
import connectDB from "./config/db.js";
import cookieParser from "cookie-parser";


dotenv.config();
connectDB();
const port = process.env.PORT || 5000;
const app = express();

// Middlewares 1.bodyParser  2.passwordencoding
app.use(express.json());
app.use(express.urlencoded({extended:true}))
app.use(cookieParser())

app.use('/api/users',userRouter)
app.get('/',(req,res)=>res.send('server is ready'))

app.use(notFound);
app.use(errorHandler);

app.listen(port,()=>{
    console.log("Your Server is running at port "+port);
})