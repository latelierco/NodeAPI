import bcrypt = require('bcrypt-nodejs');
import { Request, Response, Router } from 'express';
import User from '../models/User';
import authMiddleware from '../utils/middleware';
import utils from '../utils/utils';

class UserRouter {

  public router: Router;
  public userRoutes: UserRouter;
  private authBefore;

  constructor() {
    this.router = Router();
    this.authBefore = authMiddleware.auth;
    this.routes();
  }

  public routes() {
    this.router.get('/', (req: Request, res: Response) => this.authBefore(req, res, utils.getTokenKey(), this.findAll));
    this.router.get('/:username', (req: Request, res: Response) => this.authBefore(req, res, utils.getTokenKey(), this.findOne));
    this.router.post('/', (req: Request, res: Response) => this.authBefore(req, res, utils.getTokenKey(), this.create));
    this.router.put('/:username', (req: Request, res: Response) => this.authBefore(req, res, utils.getTokenKey(), this.update));
    this.router.delete('/:username', (req: Request, res: Response) => this.authBefore(req, res, utils.getTokenKey(), this.delete));
  }

  public findAll(req: Request, res: Response): void {
    User.find()
      .then((data) => {
        res.status(200).json({ data });
      })
      .catch((error) => {
        res.status(500).json({ error });
      });
  }

  public findOne(req: Request, res: Response): void {
    const username: string = req.params.username;
    User.findOne({ username })
      .then((data) => {
        res.status(200).json({ data });
      })
      .catch((error) => {
        res.status(500).json({ error });
      });
  }

  public create(req: Request, res: Response): void {
    const firstName: string = req.body.firstName;
    const lastName: string = req.body.lastName;
    const username: string = req.body.username;
    const email: string = req.body.email;
    const password: string = bcrypt.hashSync(req.body.password);
    const user = new User({
      email,
      firstName,
      lastName,
      password,
      username
    });
    user.save()
      .then((data) => {
        res.status(201).json({ data });
      })
      .catch((error) => {
        res.status(500).json({ error });
      });
  }

  public update(req: Request, res: Response): void {
    const username: string = req.params.username;
    const updatedAt: Date = new Date();
    if (req.body.password) {
      req.body.password = bcrypt.hashSync(req.body.password);
    }
    User.findOneAndUpdate({ username }, { ...req.body, updatedAt }, { new: true })
      .then((data) => {
        res.status(200).json({ data });
      })
      .catch((error) => {
        res.status(500).json({ error });
      });
  }

  public delete(req: Request, res: Response): void {
    const username: string = req.params.username;
    User.findOneAndRemove({ username })
      .then(() => {
        res.status(204).end();
      })
      .catch((error) => {
        res.status(500).json({ error });
      });
  }

}

this.userRoutes = new UserRouter();
this.userRoutes.routes();

export default this.userRoutes.router;