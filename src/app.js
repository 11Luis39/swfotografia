import express from 'express';
import morgan from 'morgan';
import authRoutes from './routes/auth.routes.js';
import eventos from './routes/organizador.routes.js'
import fotografos from './routes/fotografo.routes.js'
import invitados from './routes/invitado.routes.js'
import cookieParser from 'cookie-parser'
import { createRole } from './libs/initialsetup.js'
import cors from 'cors'
const app = express()


app.use(cors({
    origin: 'http://localhost:5173',
    credentials: true,
}));
createRole();
app.use(morgan('dev'));
app.use(express.json());
app.use(cookieParser());

app.use("/api", authRoutes, eventos, fotografos, invitados)

export default app;