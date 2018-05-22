import bcrypt = require('bcrypt-nodejs');
import { Request, Response, Router } from 'express';
import * as jwt from 'jsonwebtoken';
import User from '../models/User';
import utils from '../utils/utils';

class AuthenticateRouter {

  public router: Router;
  public authenticateRouter: AuthenticateRouter;

  constructor() {
    this.router = Router();
    this.routes();
  }

  public authenticate(req: Request, res: Response, secretKey: string) {
    const token = req.body.token || req.headers['x-access-token'];
    if (token) {
      jwt.verify(token, secretKey, (err, decoded) => {
        if (err) {
          return res.status(403).json({ success: false, message: 'Failed to authenticate token.' });
        } else {
          res.json({ success: true, message: 'Enjoy your token!', token: decoded });
        }
      });
    } else if (req.body.username) {
      User.findOne({ username: req.body.username }, (err: Error, user: any) => {
        if (err) {
          res.status(403).send({ succes: false, err });
        } else if (!user) {
          res.status(403).send({ success: false, message: 'Authentication failed. User not found.' });
        } else if (user) {
          if (!bcrypt.compareSync(req.body.password, user.password)) {
            res.json({ success: false, message: 'Authentication failed. Wrong password.' });
          } else {
            res.json({
              message: 'Enjoy your token!',
              success: true,
              token: jwt.sign({ username: user.username, id: user._id }, secretKey, { expiresIn: 86400 })
            });
          }
        }
      });
    } else {
      res.json({
        message: 'No name!',
        succes: false,
      });
    }
  }

  public routes() {
    this.router.post('/', (req: Request, res: Response) => this.authenticate(req, res, utils.getTokenKey() ));
  }

}

this.authenticateRouter = new AuthenticateRouter();
this.authenticateRouter.routes();

export default this.authenticateRouter.router;