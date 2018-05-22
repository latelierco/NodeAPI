'use strict';
import * as jwt from 'jsonwebtoken';

export default {
  auth: (req, res, secretKey, next) => {
    const token = req.body.token || req.param.token || req.headers['x-access-token'];
    if (token) {
      jwt.verify(token, secretKey, (err, decoded) => {
        if (err) {
          res.status(401).send({
            success: false,
            message: 'Failed to authenticate token.'
          });
        } else {
          next(req, res);
        }
      });
    } else {
      res.status(401).send({
        success: false,
        message: 'No token provided.'
      });
    }
  }
};