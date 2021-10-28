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
import { TicketService } from '../services/ticket';
import auth from './middlewares/auth';
import allow from './middlewares/allow';
import { AuthorizationType } from '../enumerators/enumerators';

@controller('/tickets', auth)
export class TicketController extends BaseHttpController implements interfaces.Controller {
  constructor(@inject('TicketService') private ticketService: TicketService) {
    super();
    this.ticketService = ticketService;
  }

  @httpPost('/', auth, allow([
    AuthorizationType.APP_CONSUMER,
    AuthorizationType.APP_ORGANIZATION,
    AuthorizationType.ADMIN,
  ]))
  async create(req: Request, res: Response): Promise<Response> {
    return this.ticketService.create(req, res);
  }

  @httpPut('/:id', auth, allow([
    AuthorizationType.APP_ORGANIZATION,
    AuthorizationType.ADMIN,
  ]))
  async update(req: Request, res: Response): Promise<Response> {
    return this.ticketService.update(req, res);
  }

  @httpDelete('/:id', auth, allow([
    AuthorizationType.APP_CONSUMER,
    AuthorizationType.APP_ORGANIZATION,
    AuthorizationType.ADMIN,
  ]))
  async delete(req: Request, res: Response): Promise<Response> {
    return this.ticketService.delete(req, res);
  }

  @httpGet('/', auth, allow([
    AuthorizationType.APP_CONSUMER,
    AuthorizationType.APP_ORGANIZATION,
    AuthorizationType.ADMIN,
  ]))
  async getAll(req: Request, res: Response): Promise<Response> {
    return this.ticketService.getAll(req, res);
  }

  @httpGet('/:id', auth, allow([
    AuthorizationType.APP_CONSUMER,
    AuthorizationType.APP_ORGANIZATION,
    AuthorizationType.ADMIN,
  ]))
  async getByid(req: Request, res: Response): Promise<Response> {
    return this.ticketService.getById(req, res);
  }
}
