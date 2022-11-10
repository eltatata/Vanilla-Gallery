import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import path from "path";
import logger from "morgan";
import { dirname } from 'path';
import { fileURLToPath } from 'url';

import imageRouter from './routes/image.router.js';

const __dirname = dirname(fileURLToPath(import.meta.url));
const app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', imageRouter);

export default app;
