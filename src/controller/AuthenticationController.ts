import bcrypt = require('bcrypt-nodejs');
import { Request, Response } from 'express';
import * as jwt from 'jsonwebtoken';
import wording from '../config/Word';
import User from '../models/User';
import utils from '../utils/Utils';

export default class AuthenticationController {
  public authenticate(req: Request, res: Response, secretKey: string) {
    const token = req.body.token || req.headers['x-access-token'];
    if (token) {
      jwt.verify(token, secretKey, (err, decoded) => {
        if (err) {
          return res.status(403).json({ success: false, message: wording.tokenFailed });
        } else {
          res.json({ success: true, message: null, token: decoded });
        }
      });
    } else if (req.body.username) {
      if (!utils.verifyBody(req)) {
        res.status(500).json( utils.formatData(false, wording.unauthorized) );
        return;
      }
      User.findOne({ username: req.body.username }, (err: Error, user: any) => {
        if (err) {
          res.status(403).send({ succes: false, message: wording.badCredentials });
        } else if (!user) {
          res.status(403).send({ success: false, message: wording.badCredentials });
        } else if (user) {
          if (!bcrypt.compareSync(req.body.password, user.password)) {
            res.json({ success: false, message: wording.badCredentials });
          } else {
            res.json({
              message: wording.tokenEnjoy,
              success: true,
              token: jwt.sign({ username: user.username, id: user._id, firstName: user.firstName, lastName: user.lastName, role: user.role }, secretKey, { expiresIn: 86400 })
            });
          }
        }
      });
    } else {
      res.status(400).json({
        message: wording.badCredentials,
        succes: false,
      });
    }
  }
}