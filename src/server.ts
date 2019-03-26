// tslint:disable:no-console

import * as bodyParser from 'body-parser';
import compression = require('compression');
import cookieParser = require('cookie-parser');
import cors = require('cors');
import express = require('express');
import * as helmet from 'helmet';
import logger = require('morgan');
import AuthenticateRouter from './routes/AuthenticateRouter';
import UserRouter from './routes/UserRouter';
import Mongo from './utils/Mongo';
import Seeder from './utils/Seeder';
import utils from './utils/Utils';

class Server {
  public app: express.Application;
  public mongo: Mongo;
  private url: string = utils.getApiUrl() as string;
  public seeder: Seeder;

  constructor() {
    this.mongo = new Mongo();
    this.app = express();
    this.seeder = new Seeder();
    this.setConfig();
    this.routes();
    utils.app = this.app;
  }

  public routes(): void {
    this.app.use(`${this.url}users`, UserRouter);
    this.app.use(`${this.url}authenticate`, AuthenticateRouter);
  }

  public setConfig(): void {
    this.app.use(bodyParser.urlencoded({ extended: true }));
    this.app.use(bodyParser.json());
    this.app.use(cookieParser());
    this.app.use(logger('dev'));
    this.app.use(compression());
    this.app.use(helmet());
    this.app.use(cors());
    this.seeder.seedUser().then((e) => console.log(utils.log(`Default user ${(e) ? 'created' : 'already created'}`)));
  }
}

export default new Server().app;