// tslint:disable:prefer-for-of

import * as jwt from 'jsonwebtoken';
import utils from './utils';

export default function authenticateBefore(target: any, key: any, descriptor: PropertyDescriptor) {
  descriptor = Object.getOwnPropertyDescriptor(target, key);
  const originalMethod = descriptor.value;
  descriptor.value = function() {
    const args = [];
    const status = { status: false, user: false };
    for (let index = 0; index < arguments.length; index++) {
      args.push(arguments[index]);
    }
    const token = args[0].body.token || args[0].headers['x-access-token'] || '';
    jwt.verify(token, utils.getTokenKey(), (err, decoded) => {
      if (err) {
        args[1].status(401).json({
          success: false,
          message: 'No token provided.'
        });
      } else {
        status.status = true;
        status.user = decoded;
        args.push(status);
        originalMethod.apply(this, args);
      }
      return status;
    });
  };
  return descriptor;
}