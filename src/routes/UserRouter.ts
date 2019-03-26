import { Request, Response, Router } from 'express';
import UserController from '../controller/UserController';

class UserRouter {
  public router: Router;
  public userRoutes: UserRouter;
  private userController: UserController;
  private userRoutesConfig: object;

  constructor() {
    this.userController = new UserController();
    this.router = Router();
    this.setRoutes();
  }

  public setRoutes() {
    this.router
      .get('/', (req: Request, res: Response) => this.userController.findAll(req, res))
      .get('/:userID', (req: Request, res: Response) => this.userController.findOne(req, res))
      .post('/', (req: Request, res: Response) => this.userController.create(req, res))
      .put('/:userID', (req: Request, res: Response) => this.userController.update(req, res))
      .delete('/:userID', (req: Request, res: Response) => this.userController.delete(req, res));
  }
}

export default new UserRouter().router;