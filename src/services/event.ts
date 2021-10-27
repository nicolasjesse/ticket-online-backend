import { inject, injectable } from 'inversify';
import { Request, Response } from 'express';
import httpStatus from 'http-status';
import Event from '../db/entities/event';
import EventRepository from '../db/repositories/event';

@injectable()
export class EventService {
  constructor(@inject('EventRepository') private eventRepository: EventRepository) {
    this.eventRepository = eventRepository;
  }

  async create(req: Request, res: Response): Promise<Response<Event>> {
    const {
      name, local, schedule, price, quantity, date, eventType, userId,
    } = req.body;

    const event: Event = await this.eventRepository.createEvent({
      name,
      local,
      schedule,
      price,
      quantity,
      date,
      eventType,
      userId,
    });

    return res.json(event);
  }

  async update(req: Request, res: Response): Promise<Response<Event>> {
    const eventToUpdate: Event = {
      ...req.body.name && { name: req.body.name },
      ...req.body.local && { local: req.body.local },
      ...req.body.schedule && { schedule: req.body.schedule },
      ...req.body.price && { price: req.body.price },
      ...req.body.quantity && { quantity: req.body.quantity },
      ...req.body.date && { date: req.body.date },
      ...req.body.eventType && { eventType: req.body.eventType },
      ...req.body.userId && { userId: req.body.userId },
    };

    await this.eventRepository.updateById(req.params.id, eventToUpdate);
    const column: Event = await this.eventRepository.findById(req.params.id);
    return res.json(column);
  }

  async delete(req: Request, res: Response): Promise<Response> {
    await this.eventRepository.deleteById(req.params.id);
    return res.json(httpStatus[200]);
  }

  async getById(req: Request, res: Response): Promise<Response> {
    const event: Event = await this.eventRepository.findById(req.params.id);
    return res.json(event);
  }

  async getAll(_req: Request, res: Response): Promise<Response<Array<Event | null>>> {
    const eventsAll: Event[] = await this.eventRepository.selectAll({
      select: ['id', 'name', 'local', 'schedule', 'price', 'quantity', 'date', 'userId', 'eventType'],
      order: { date: 'ASC' },
    });
    return res.json(eventsAll);
  }
}
