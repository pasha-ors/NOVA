import express, {json} from 'express';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import dotenv from 'dotenv';
import {dirname, join} from 'path';
import {fileURLToPath} from 'url';
import usersRouter from './routes/users-routes.js';
import authRoutes from "./routes/auth-routes.js";

dotenv.config();

const __dirname = dirname(fileURLToPath(import.meta.url));

const app = express()
const PORT = process.env.RORT || 5000;
const corsOptions = {credentials: true, origin: 'http://localhost:3000' || '*'};

app.use(cors(corsOptions));
app.use(json());
app.use(cookieParser());

// main

app.use('/', express.static(join(__dirname, 'public')));
app.use('/api/users', usersRouter);
app.use('/api/auth', authRoutes);

//

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});