import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import mongoSanitize from "express-mongo-sanitize";
import path from "path";
import logger from "morgan";
import { dirname } from 'path';
import { fileURLToPath } from 'url';

import imageRouter from './routes/image.router.js';
import authRouter from './routes/auth.router.js';
import profileRouter from './routes/profile.router.js';

const __dirname = dirname(fileURLToPath(import.meta.url));
const app = express();

const whiteList = ["http://localhost:3000"];

const corsOptions = {
    origin: function (origin, callback) {
        if (!origin || whiteList.includes(origin)) return callback(null, true);

        return callback(`Error de CORS origin: ${origin}, no autorizado`);
    },
    credentials: true
}

app.use(cors(corsOptions));
app.use(mongoSanitize());
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', imageRouter);
app.use('/auth', authRouter);
app.use('/profile', profileRouter);

export default app;
