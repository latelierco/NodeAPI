import bcrypt = require('bcrypt-nodejs');
import { Request, Response } from 'express';
import config from '../config/Index';
import wording from '../config/Word';
import authenticateBefore from '../middleware/Authenticate';
import User from '../models/User';
import utils from '../utils/Utils';
import AuthenticationController from './AuthenticationController';

export default class UserController {
  public authController = new AuthenticationController();

  @authenticateBefore
  public async findAll(req: Request, res: Response, status?: any) {
    await User.find({}).then((data) => {
      res.status(200).json(
        utils.formatData(true, data)
      );
    }).catch((error) => {
      res.status(500).json(
        utils.formatData(false, error)
      );
    });
  }

  @authenticateBefore
  public async findOne(req: Request, res: Response, status?: any) {
    if (status.user.role !== config.role.admin && req.params.userID !== status.user.id) {
      res.status(401).json({
        success: false,
        message: wording.unauthorized
      });
    }
    const _id: string = req.params.userID;
    await User.findOne({ _id })
      .then((data) => {
        res.status(200);
        res.json(
          utils.formatData(true, data)
        );
      })
      .catch((error) => {
        res.status(500);
        res.json(
          utils.formatData(false, error)
        );
      });
  }

  @authenticateBefore
  public async create(req: Request, res: Response, status?: any) {
    if (!utils.verifyBody(req)) {
      res.status(500).json( utils.formatData(false, wording.unauthorized) );
      return;
    }
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
    await user.save()
      .then((data) => {
        res.status(201).json(
          utils.formatData(true, data)
        );
      }).catch((error) => {
        res.status(500).json(
          utils.formatData(false, error)
        );
      });
  }

  @authenticateBefore
  public async update(req: Request, res: Response, status?: any) {
    if (status.user.role !== config.role.admin && req.params.userID !== status.user.id) {
      res.status(401).json({
        success: false,
        message: wording.unauthorized
      });
    }
    if (!utils.verifyBody(req)) {
      res.status(500).json( utils.formatData(false, wording.unauthorized) );
      return;
    }
    const _id: string = req.params.userID;
    const updatedAt: Date = new Date();
    if (req.body.password) {
      req.body.password = bcrypt.hashSync(req.body.password);
    }
    await User.findOneAndUpdate({ _id }, { ...req.body, updatedAt }, { new: true })
      .then((data) => {
        res.status(200).json(
          utils.formatData(true, data)
        );
      })
      .catch((error) => {
        res.status(500).json(
          utils.formatData(false, error)
        );
      });
  }

  @authenticateBefore
  public async delete(req: Request, res: Response, status?: any) {
    if (status.user.role !== config.role.admin && req.params.userID !== status.user.id) {
      res.status(401).json({
        success: false,
        message: wording.unauthorized
      });
    }
    const _id: string = req.params.userID;
    await User.findOneAndRemove({ _id })
      .then(() => {
        res.status(204).end();
      })
      .catch((error) => {
        res.status(500).json(
          utils.formatData(false, error)
        );
      });
  }
}