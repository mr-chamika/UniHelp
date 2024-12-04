import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import userModel from './Models/UserModel.js';
import userRouter from './Routes/userRouter.js';

const app = express();

app.use(express.json());
app.use(cors());

app.use('/user',userRouter);

mongoose.connect('mongodb://localhost:27017/UniHelp')
.then(()=>console.log('Database connected successfully'))
.catch((err)=>console.log('Error connecting database : ',err));

app.listen(5000,()=>console.log('Listening through port 5000'));