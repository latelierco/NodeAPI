import { Request, Response, Router } from 'express';
import AuthenticationController from '../controller/AuthenticationController';
import utils from '../utils/Utils';

class AuthenticateRouter {
  public router: Router;
  public authenticateRouter: AuthenticateRouter;
  public authController: AuthenticationController;

  constructor() {
    this.authController = new AuthenticationController();
    this.router = Router();
    this.setRoutes();
  }

  public setRoutes() {
    this.router
      .post('/', (req: Request, res: Response) => this.authController.authenticate(req, res, utils.getTokenKey()));
  }
}

export default new AuthenticateRouter().router;