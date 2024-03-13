import express from 'express';
import { AppError, globalErrorHandler } from "./errors";
import { limitRequest } from "./config/plugins/rate-limit.plugin";
import { enableCors } from "./config/plugins/cors.plugin";
import hpp from 'hpp'
import helmet from "helmet";
import {router} from "./routes";


const app = express();
const ACCEPTED_ORIGINS = ['http://localhost:8080', 'http://localhost:4200', 'http://localhost:5173'];
const rateLimit = limitRequest(10000, 60, 'Too many request from this IP, please try again in an hour!')


app.use( express.json() );
app.use( express.urlencoded({ extended: true }) );
app.use( rateLimit );
app.use( helmet() );
app.use( hpp() );

enableCors( app, ACCEPTED_ORIGINS )

app.use('/api/v1', router)

app.use('/api/v1/discord', (req, res) => {
  const token = req.body
});

app.all('*', (req, res, next) => {
  next(new AppError(`Can't find ${req.originalUrl} on this server!`, 404))
})

app.use(globalErrorHandler);

export default app;