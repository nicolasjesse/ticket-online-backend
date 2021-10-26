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

  @httpPut('/:id')
  async update(req: Request, res: Response): Promise<Response> {
    return this.userService.update(req, res);
  }

  @httpDelete('/:id')
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
