import bcrypt = require('bcrypt-nodejs');
import { Request, Response } from 'express';
import * as jwt from 'jsonwebtoken';
import User from '../models/User';
import wording from '../config/wording'

export default class AuthenticationController {
  public authenticate(req: Request, res: Response, secretKey: string) {
    const token = req.body.token || req.headers['x-access-token'];
    if (token) {
      jwt.verify(token, secretKey, (err, decoded) => {
        if (err) {
          return res.status(403).json({ success: false, message: wording.tokenFailed });
        } else {
          res.json({ success: true, message: wording.tokenEnjoy, token: decoded });
        }
      });
    } else if (req.body.username) {
      User.findOne({ username: req.body.username }, (err: Error, user: any) => {
        if (err) {
          res.status(403).send({ succes: false, err });
        } else if (!user) {
          res.status(403).send({ success: false, message: wording.userNotFound });
        } else if (user) {
          if (!bcrypt.compareSync(req.body.password, user.password)) {
            res.json({ success: false, message: wording.wrongPassword });
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
        message: wording.noCredentials,
        succes: false,
      });
    }
  }
}