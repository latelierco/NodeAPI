import * as jwt from 'jsonwebtoken';
import config from '../config/config';
import utils from './Utils';
import wording from '../config/wording'

export default function authenticateBefore(target: any, key: any, descriptor: PropertyDescriptor) {
  descriptor = Object.getOwnPropertyDescriptor(target, key);
  const originalMethod = descriptor.value;
  descriptor.value = function() {
    const args = [];
    const status = { status: false, user: false };
    for (let index = 0; index < arguments.length; index++) args.push(arguments[index]);
    const req = args[0];
    const res = args[1];
    const token = req.body.token || req.headers['x-access-token'] || '';
    jwt.verify(token, utils.getTokenKey(), (err, decoded) => {
      if (err) {
        res.status(401).json({
          success: false,
          ...err
        });
      } else {
        status.status = true;
        status.user = decoded;
        args.push(status);
        if (decoded.role >= config.permissions[key]) {
          originalMethod.apply(this, args);
        } else {
          res.status(401).json({
            success: false,
            message: wording.unauthorized
          });
        }
      }
      return status;
    });
  };
  return descriptor;
}