import { inject } from 'inversify';
import { Request, Response } from 'express';
import {
  BaseHttpController, controller, httpPost, interfaces,
} from 'inversify-express-utils';
import { AuthService } from '../services/auth';

@controller('/auth')
export class AuthController extends BaseHttpController implements interfaces.Controller {
  constructor(@inject('AuthService') private authService: AuthService) {
    super();
    this.authService = authService;
  }

  @httpPost('/login')
  async authenticate(req: Request, res: Response): Promise<unknown> {
    return this.authService.authenticate(req, res);
  }
}
