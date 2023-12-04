/**
 * Setup express server.
 */

import cookieParser from 'cookie-parser';
import morgan from 'morgan';
import path from 'path';
import helmet from 'helmet';
import express, { Request, Response, NextFunction } from 'express';
import logger from 'jet-logger';

import 'express-async-errors';

import BaseRouter from '@src/routes/api';
import Paths from '@src/constants/Paths';

import HttpStatusCodes from '@src/constants/HttpStatusCodes';

import { NodeEnvs } from '@src/constants/misc';
import { RouteError } from '@src/other/classes';
import { firebaseAuthentication } from './authentificationFireBase';
import CORS from 'cors';
import './pre-start'; // Must be the first import
import { connect } from 'mongoose';
import server from './server';
import http  from 'http';


// **** Variables **** //

const app = express();
connect(process.env.MONGODB_URI!)
console.log(process.env.MONGODB_URI);


// **** Setup **** //

// rend disponible la documentation de l'interface logicielle
app.get('/api-docs/', async (req, res) => {
  res.set('Content-Security-Policy', 'script-src blob:');
  res.set('Content-Security-Policy', 'worker-src blob:');
  res.sendFile(path.join(__dirname, 'index.html'));
});

// redirige vers api-docs
app.get('/', (req, res) => {
  res.redirect('/api-docs');
});


// Basic middleware
app.use(express.json());

app.use(CORS());
//app.use(firebaseAuthentication);


app.use(express.urlencoded({extended: true}));

// Show routes called in console during development
if (process.env.NODE_ENV === NodeEnvs.Dev.valueOf()) {
  app.use(morgan('dev'));
}

// Security
if (process.env.NODE_ENV === NodeEnvs.Production.valueOf()) {
  app.use(helmet());
}

// Add APIs, must be after middleware
app.use(Paths.Base, BaseRouter);

// Add error handler
app.use((
  err: Error,
  _: Request,
  res: Response,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  next: NextFunction,
) => {
  if (process.env.NODE_ENV !== NodeEnvs.Test.valueOf()) {
    logger.err(err, true);
  }
  
  let status = HttpStatusCodes.BAD_REQUEST;
  if (err instanceof RouteError) {
    status = err.status;
  }
  return res.status(status).json({ error: err.message });
});

// Set views directory (html)
const viewsDir = path.join(__dirname, 'views');
app.set('views', viewsDir);

// Set static directory (js and css).
const staticDir = path.join(__dirname, 'public');
app.use(express.static(staticDir));

// Nav to users pg by default
app.get('/', (_: Request, res: Response) => {
  return res.redirect('/home');
});

// Redirect to login if not logged in.
app.get('/login', (_: Request, res: Response) => {
  return res.sendFile('home.html', { root: viewsDir });
});

export default app;
