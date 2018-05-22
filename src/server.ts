import * as bodyParser from 'body-parser';
import compression = require('compression');
import * as helmet from 'helmet';

import bcrypt from 'bcrypt-nodejs';
import cookieParser = require('cookie-parser');
import cors = require('cors');
import express = require('express');
import logger = require('morgan');
import config from './config/config';
import AuthenticateRouter from './router/AuthenticateRouter';
import UserRouter from './router/UserRouter';
import Mongo from './utils/Mongo';
import utils from './utils/Utils';

class Server {

  public app: express.Application;
  public mongo;
  private api_url: string = config.api_url;

  constructor() {
    this.mongo = new Mongo();
    this.app = express();
    this.config();
    this.routes();
    utils.app = this.app;
  }
  
  public config(): void {

    this.app.use(bodyParser.urlencoded({ extended: true }));
    this.app.use(bodyParser.json());
    this.app.use(cookieParser());
    this.app.use(logger('dev'));
    this.app.use(compression());
    this.app.use(helmet());
    this.app.use(cors());
  }

  public routes(): void {
    this.app.use(this.api_url + 'users', UserRouter);
    this.app.use(this.api_url + 'authenticate', AuthenticateRouter);
  }
}

export default new Server().app;