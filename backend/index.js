import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import userRouter from './Routes/userRouter.js';
import eventRouter from './Routes/eventRouter.js';
import storageRouter from './Routes/storageRouter.js'
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

app.use('/user', userRouter);
app.use('/event', eventRouter)
app.use('/storage', storageRouter)

mongoose.connect(process.env.MONGODB_URI)
    .then(() => console.log('Database connected successfully'))
    .catch((err) => console.log('Error connecting database : ', err));

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Serve uploads folder as static with correct ORB headers
app.use('/uploads', express.static(path.join(__dirname, 'uploads'), {
    setHeaders: (res) => {
        res.set('Cross-Origin-Resource-Policy', 'cross-origin');
    }
}));

app.listen(process.env.PORT, () => console.log(`Listening through port ${process.env.PORT}`));