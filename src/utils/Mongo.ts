// tslint:disable:no-console

import * as mongoose from 'mongoose';
import utils from './Utils';

class Mongo {
  public mongoose = mongoose;
  public db;

  constructor() {
    this.config();
  }

  public config() {
    mongoose.connect(utils.getMONGO_URI());
    this.db = mongoose.connection;
    this.db.on('error', () => console.log(`${utils.newDate()}: connection error:`));
    this.db.once('open', () => console.log(`${utils.newDate()}: Connected to Mongo`));
  }
}

export default Mongo;