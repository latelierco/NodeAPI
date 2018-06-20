import { Request, Response, Router } from 'express';
import AuthenticationController from '../controller/AuthenticationController';
import utils from '../utils/utils';

class AuthenticateRouter {
  public router: Router;
  public authenticateRouter: AuthenticateRouter;
  public authController: AuthenticationController;

  constructor() {
    this.authController = new AuthenticationController();
    this.router = Router();
    this.routes();
  }

  public routes() {
    this.router.post('/', (req: Request, res: Response) =>
      this.authController.authenticate(req, res, utils.getTokenKey())
    );
  }
}

this.authenticateRouter = new AuthenticateRouter();
this.authenticateRouter.routes();

export default this.authenticateRouter.router;