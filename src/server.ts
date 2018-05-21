import * as bodyParser from 'body-parser';
import compression = require('compression');
import cookieParser = require('cookie-parser');
import cors = require('cors');
import express = require('express');
import * as helmet from 'helmet';
import * as mongoose from 'mongoose';
import logger = require('morgan');
import * as path from 'path';
import UserRouter from './router/UserRouter';

class Server {

  // set app to be of type express.Application
  public app: express.Application;

  constructor() {
    this.app = express();
    this.config();
    this.routes();
  }
  
  // application config
  public config(): void {

    const MONGO_URI: string = 'mongodb://localhost/tes'; 
    mongoose.connect(MONGO_URI || process.env.MONGODB_URI as string);

    // express middleware
    this.app.use(bodyParser.urlencoded({ extended: true }));
    this.app.use(bodyParser.json());
    this.app.use(cookieParser());
    this.app.use(logger('dev'));
    this.app.use(compression());
    this.app.use(helmet());
    this.app.use(cors());

  }

  // application routes
  public routes(): void {
    const router: express.Router = express.Router();

    this.app.use('/', router);
    this.app.get('/test', (req, res) => {
      res.send({test: 'ok'});
    });
    this.app.use('/api/v1/users', UserRouter);
  }
}

// export
export default new Server().app;