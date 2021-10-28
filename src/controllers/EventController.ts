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
import { EventService } from '../services/event';
import auth from './middlewares/auth';
import allow from './middlewares/allow';
import { AuthorizationType } from '../enumerators/enumerators';

@controller('/events', auth)
export class EventController extends BaseHttpController implements interfaces.Controller {
  constructor(@inject('EventService') private eventService: EventService) {
    super();
    this.eventService = eventService;
  }

  @httpPost('/', auth, allow([
    AuthorizationType.APP_ORGANIZATION,
    AuthorizationType.ADMIN,
  ]))
  async create(req: Request, res: Response): Promise<Response> {
    return this.eventService.create(req, res);
  }

  @httpPut('/:id', auth, allow([
    AuthorizationType.APP_ORGANIZATION,
    AuthorizationType.ADMIN,
  ]))
  async update(req: Request, res: Response): Promise<Response> {
    return this.eventService.update(req, res);
  }

  @httpDelete('/:id', auth, allow([
    AuthorizationType.APP_ORGANIZATION,
    AuthorizationType.ADMIN,
  ]))
  async delete(req: Request, res: Response): Promise<Response> {
    return this.eventService.delete(req, res);
  }

  @httpGet('/', auth, allow([
    AuthorizationType.APP_CONSUMER,
    AuthorizationType.APP_ORGANIZATION,
    AuthorizationType.ADMIN,
  ]))
  async getAll(req: Request, res: Response): Promise<Response> {
    return this.eventService.getAll(req, res);
  }

  @httpGet('/:id', auth, allow([
    AuthorizationType.APP_CONSUMER,
    AuthorizationType.APP_ORGANIZATION,
    AuthorizationType.ADMIN,
  ]))
  async getByid(req: Request, res: Response): Promise<Response> {
    return this.eventService.getById(req, res);
  }
}
