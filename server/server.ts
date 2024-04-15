import express, { NextFunction, Request, Response } from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import compression from 'compression';
import config from '../config/app.config';
import Logger from '../app/modules/Logger';
import models from '../app/models/index';
import router from '../router/index';
import httpConstants from '../app/constant/http.constants';
import messagesConstants from '../app/constant/messages.constants';
import { ErrorType } from '../app/types/error.type';

const logger = new Logger();
const app = express();
const PORT = process.env.PORT;
app.set('config', config); // the system configrationsx
app.use(bodyParser.json());

app.use(compression());
app.use(cors());

app.set('db',models);

app.set('port', process.env.DEV_APP_PORT);

app.use((req: Request, res: Response, next: NextFunction) => {
  const logString = `a request has been made with the following uuid ${req.url} ${req.headers['user-agent']} ${JSON.stringify(req.body)}`;
  logger.log(logString, 'info', '');
  next();
});

app.use(router);

app.use((req: Request, res: Response, next: NextFunction) => {
  logger.log('the url you are trying to reach is not hosted on our server', 'error', '');
  const err: ErrorType = new Error('Not Found');
  err.status = httpConstants.HTTP_REQUESTED_RESOURCE_NOT_FOUND;
  res.status(err.status).json({ type: 'error', message: messagesConstants.URL_NOT_IN_OUR_SERVER });
  next(err);
});

const server =  app.listen(PORT, () => {
  console.log(`Server now up at port ${PORT}`);
});

export default server;
