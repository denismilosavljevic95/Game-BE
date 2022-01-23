// src/index.ts

import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import Logger from './lib/logger';
import battleRouter from './routers/battle.router';

const app = express();
const port = process.env.PORT;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());

app.use('/', battleRouter);

app.listen(port, () => {
    Logger.info(`App is listening on port ${port}`);
});
