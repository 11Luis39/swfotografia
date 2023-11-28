import express from 'express';
import fileupload from 'express-fileupload'
import morgan from 'morgan';
import authRoutes from './routes/auth.routes.js';
import eventos from './routes/organizador.routes.js'
import fotografos from './routes/fotografo.routes.js'
import invitados from './routes/invitado.routes.js'
import  asistencia from './routes/asistencia.routes.js'
import cookieParser from 'cookie-parser'
import { createRole } from './libs/initialsetup.js'
import cors from 'cors'
import dotenv from 'dotenv';

const app = express()
app.use(cors({
    origin: 'http://localhost:5173',
    credentials: true,
}));

createRole();
app.use(fileupload({
    useTempFiles: true,
    tempFileDir:'./upload'
}));
app.use(morgan('dev'));
app.use(express.json());
app.use(cookieParser());

app.use("/api", authRoutes, eventos, fotografos, invitados, asistencia)

export default app;