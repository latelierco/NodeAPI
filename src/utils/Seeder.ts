import bcrypt = require('bcrypt-nodejs');
import config from '../config/config';
import User from '../models/User';
import utils from './Utils';

export default class Seeder {
  public user;
  constructor() {
    this.user = utils.getDefaultUser();
    this.user.password = bcrypt.hashSync(this.user.password);
  }
  public seedUser() {
    return this.verifyIfNotExist().then( (_) => {
      const user = new User(this.user);
      return user.save()
        .then((__) => {
          return true;
        }).catch((__) => {
          return false;
        });
    });
  }

  public verifyIfNotExist() {
    return User.findOne(this.user.username).then((_) => {
      return true;
    }).catch((_) => {
      return false;
    });
  }
}