import { inject, injectable } from 'inversify';
import { Request, Response } from 'express';
import httpStatus from 'http-status';
import Ticket from '../db/entities/ticket';
import TicketRepository from '../db/repositories/ticket';

@injectable()
export class TicketService {
  constructor(@inject('TicketRepository') private ticketRepository: TicketRepository) {
    this.ticketRepository = ticketRepository;
  }

  async create(req: Request, res: Response): Promise<Response<Ticket>> {
    const {
      paymentStatus, userId, eventId,
    } = req.body;

    const ticket: Ticket = await this.ticketRepository.createTicket({
      paymentStatus, userId, eventId,
    });

    return res.json(ticket);
  }

  async update(req: Request, res: Response): Promise<Response<Ticket>> {
    const ticketToUpdate: Ticket = {
      ...req.body.paymentStatus && { paymentStatus: req.body.paymentStatus },
      ...req.body.userId && { userId: req.body.userId },
      ...req.body.eventId && { eventId: req.body.eventId },
    };

    await this.ticketRepository.updateById(req.params.id, ticketToUpdate);
    const column: Ticket = await this.ticketRepository.findById(req.params.id);
    return res.json(column);
  }

  async delete(req: Request, res: Response): Promise<Response> {
    await this.ticketRepository.deleteById(req.params.id);
    return res.json(httpStatus[200]);
  }

  async getById(req: Request, res: Response): Promise<Response> {
    const ticket: Ticket = await this.ticketRepository.findById(req.params.id);
    return res.json(ticket);
  }

  async getAll(_req: Request, res: Response): Promise<Response<Array<Ticket | null>>> {
    const ticketsAll: Ticket[] = await this.ticketRepository.selectAll({
      select: ['paymentStatus', 'userId', 'eventId'],
      order: { paymentStatus: 'ASC' },
    });
    return res.json(ticketsAll);
  }
}