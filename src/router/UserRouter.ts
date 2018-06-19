import { Request, Response, Router } from 'express';
import UserController from '../controller/userController';

class UserRouter {
  public router: Router;
  public userRoutes: UserRouter;
  private userController: UserController;

  constructor() {
    this.userController = new UserController();
    this.router = Router();
    this.routes();
  }

  public routes() {
    this.router.get('/', (req: Request, res: Response) =>
      this.userController.findAll(req, res)
    );
    this.router.get('/:userID', (req: Request, res: Response) =>
      this.userController.findOne(req, res)
    );
    this.router.post('/', (req: Request, res: Response) =>
      this.userController.create(req, res)
    );
    this.router.put('/:userID', (req: Request, res: Response) =>
      this.userController.update(req, res)
    );
    this.router.delete('/:userID', (req: Request, res: Response) =>
      this.userController.delete(req, res)
    );
  }

}

this.userRoutes = new UserRouter();
this.userRoutes.routes();

export default this.userRoutes.router;