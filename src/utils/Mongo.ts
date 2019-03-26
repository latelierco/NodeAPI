import * as mongoose from 'mongoose';
import utils from './Utils';

class Mongo {
  // tslint:disable:no-console
  public mongoose = mongoose;
  public db: mongoose.Connection;
  private options: object;

  constructor() {
    this.options = {
      autoIndex: false, // Don't build indexes
      bufferMaxEntries: 0,
      connectTimeoutMS: 10000, // Give up initial connection after 10 seconds
      family: 4, // Use IPv4, skip trying IPv6
      poolSize: 10, // Maintain up to 10 socket connections
      useNewUrlParser: true,
      useCreateIndex: true,
      useFindAndModify: false,
      reconnectInterval: 500, // Reconnect every 500ms
      reconnectTries: Number.MAX_VALUE, // Never stop trying to reconnect
      socketTimeoutMS: 45000, // Close sockets after 45 seconds of inactivity
    };
    this.launch();
  }

  public launch() {
    this.mongoose.connect(`${utils.getMONGO_URI()}`, this.options);
    this.db = mongoose.connection;
    this.db.on('error', (e) => console.log(`${utils.newDate()}: connection error:` + e));
    this.db.once('open', () => console.log(`${utils.newDate()}: Connected to Mongo`));
  }
}

export default Mongo;