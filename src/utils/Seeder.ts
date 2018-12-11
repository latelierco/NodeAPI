import bcrypt = require('bcrypt-nodejs');
import User from '../models/User';
import utils from './Utils';

export default class Seeder {
  public user;
  constructor() {
    this.user = utils.getDefaultUser();
    this.user.password = bcrypt.hashSync(this.user.password);
  }
  public seedUser() {
    return this.verifyIfNotExist().then((_) => {
      if (!_) {
        const user = new User(this.user);
        return user.save()
          .then((__) => {
            return true;
          }).catch((__) => {
            return false;
          });
      } else {
        return false;
      }
    });
  }

  public verifyIfNotExist() {
    return User.findOne({ role: this.user.role }).then((_) => {
      return (_) ? true : false;
    }).catch((_) => {
      return false;
    });
  }
}