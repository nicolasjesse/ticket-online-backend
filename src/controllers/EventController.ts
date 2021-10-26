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

@controller('/events')
export class EventController extends BaseHttpController implements interfaces.Controller {
  constructor(@inject('EventService') private eventService: EventService) {
    super();
    this.eventService = eventService;
  }

  @httpPost('/')
  async create(req: Request, res: Response): Promise<Response> {
    return this.eventService.create(req, res);
  }

  @httpPut('/:id')
  async update(req: Request, res: Response): Promise<Response> {
    return this.eventService.update(req, res);
  }

  @httpDelete('/:id')
  async delete(req: Request, res: Response): Promise<Response> {
    return this.eventService.delete(req, res);
  }

  @httpGet('/')
  async getAll(req: Request, res: Response): Promise<Response> {
    return this.eventService.getAll(req, res);
  }

  @httpGet('/:id')
  async getByid(req: Request, res: Response): Promise<Response> {
    return this.eventService.getById(req, res);
  }
}
