import { inject } from 'inversify';
import { Request, Response } from 'express';
import {
  BaseHttpController,
  controller,
  httpGet,
  httpDelete,
  httpPut,
  httpPost,
  interfaces,
} from 'inversify-express-utils';
import { UserService } from '../services/user';
import auth from './middlewares/auth';
import allow from './middlewares/allow';
import { AuthorizationType } from '../enumerators/enumerators';

@controller('/users')
export class UserController extends BaseHttpController implements interfaces.Controller {
  constructor(@inject('UserService') private userService: UserService) {
    super();
    this.userService = userService;
  }

  @httpPost('/')
  async create(req: Request, res: Response): Promise<Response> {
    return this.userService.create(req, res);
  }

  @httpPut('/:id', auth, allow([
    AuthorizationType.APP_CONSUMER,
    AuthorizationType.APP_ORGANIZATION,
    AuthorizationType.ADMIN,
  ]))
  async update(req: Request, res: Response): Promise<Response> {
    return this.userService.update(req, res);
  }

  @httpDelete('/:id', auth, allow([
    AuthorizationType.APP_CONSUMER,
    AuthorizationType.APP_ORGANIZATION,
    AuthorizationType.ADMIN,
  ]))
  async delete(req: Request, res: Response): Promise<Response> {
    return this.userService.delete(req, res);
  }

  @httpGet('/')
  async getAll(req: Request, res: Response): Promise<Response> {
    return this.userService.getAll(req, res);
  }

  @httpGet('/:id')
  async getByid(req: Request, res: Response): Promise<Response> {
    return this.userService.getById(req, res);
  }
}
