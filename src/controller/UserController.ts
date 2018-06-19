import bcrypt = require('bcrypt-nodejs');
import { Request, Response } from 'express';
import User from '../models/User';
import authenticateBefore from '../utils/Middleware';
import AuthenticationController from './AuthenticationController';

export default class UserController {
  public authController = new AuthenticationController();

  @authenticateBefore
  public findAll(req: Request, res: Response, status?: any): void {
    User.find().then((data) => {
      res.status(200).json({ data });
    }).catch((error) => {
      res.status(500).json({ error });
    });
  }

  @authenticateBefore
  public findOne(req: Request, res: Response, status?: any): void {
    const _id: string = req.params.userID;
    User.findOne({ _id })
      .then((data) => {
        res.status(200);
        res.json({ data });
      })
      .catch((error) => {
        res.status(500);
        res.json({ error });
      });
  }

  @authenticateBefore
  public create(req: Request, res: Response, status?: any): void {
    const firstName: string = req.body.firstname;
    const lastName: string = req.body.lastname;
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
      }).catch((error) => {
        res.status(500).json({ error });
      });
  }

  @authenticateBefore
  public update(req: Request, res: Response, status?: any): void {
    const _id: string = req.params.userID;
    const updatedAt: Date = new Date();
    if (req.body.password) {
      req.body.password = bcrypt.hashSync(req.body.password);
    }
    User.findOneAndUpdate({ _id }, { ...req.body, updatedAt }, { new: true })
      .then((data) => {
        res.status(200).json({ data });
      })
      .catch((error) => {
        res.status(500).json({ error });
      });
  }

  @authenticateBefore
  public delete(req: Request, res: Response, status?: any): void {
    const _id: string = req.params.userID;
    User.findOneAndRemove({ _id })
      .then(() => {
        res.status(204).end();
      })
      .catch((error) => {
        res.status(500).json({ error });
      });
  }
}