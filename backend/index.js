import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import userRouter from './Routes/userRouter.js';
import eventRouter from './Routes/eventRouter.js';
import dotenv from 'dotenv';

dotenv.config();

const app = express();

app.use(express.json());
app.use(cors());

app.use('/user', userRouter);
app.use('/event', eventRouter)

mongoose.connect(process.env.MONGODB_URI)
    .then(() => console.log('Database connected successfully'))
    .catch((err) => console.log('Error connecting database : ', err));

app.listen(process.env.PORT, () => console.log(`Listening through port ${process.env.PORT}`));