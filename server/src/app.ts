import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import { configureRoutes } from './routes';

const app = express();

app.use(bodyParser.json());
app.use(cors());

configureRoutes(app);

export default app;