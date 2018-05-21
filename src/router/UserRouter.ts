import { Request, Response, Router } from 'express';
import User from '../models/User';

class UserRouter {

  public router: Router;
  public userRoutes: UserRouter;

  constructor() {
    this.router = Router();
    this.routes();
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
    const password: string = req.body.password;

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
    
    User.findOneAndUpdate({ username }, { ...req.body, updatedAt }, {new: true})
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

  public routes() {
    this.router.get('/', this.findAll);
    this.router.get('/:username', this.findOne);
    this.router.post('/', this.create);
    this.router.put('/:username', this.update);
    this.router.delete('/:username', this.delete);
  }

}

this.userRoutes = new UserRouter();
this.userRoutes.routes();

export default this.userRoutes.router;