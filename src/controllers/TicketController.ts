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

@controller('/tickets')
export class TicketController extends BaseHttpController implements interfaces.Controller {
  constructor(@inject('TicketService') private ticketService: TicketService) {
    super();
    this.ticketService = ticketService;
  }

  @httpPost('/')
  async create(req: Request, res: Response): Promise<Response> {
    return this.ticketService.create(req, res);
  }

  @httpPut('/:id')
  async update(req: Request, res: Response): Promise<Response> {
    return this.ticketService.update(req, res);
  }

  @httpDelete('/:id')
  async delete(req: Request, res: Response): Promise<Response> {
    return this.ticketService.delete(req, res);
  }

  @httpGet('/')
  async getAll(req: Request, res: Response): Promise<Response> {
    return this.ticketService.getAll(req, res);
  }

  @httpGet('/:id')
  async getByid(req: Request, res: Response): Promise<Response> {
    return this.ticketService.getById(req, res);
  }
}
