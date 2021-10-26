import { injectable } from 'inversify';
import {
  getRepository,
  Repository,
  DeleteResult,
  FindManyOptions,
  UpdateResult,
} from 'typeorm';
import Event from '../entities/event';

@injectable()
class EventRepository {
  private eventRepository: Repository<Event> = getRepository(Event);

  async findByName(name: string): Promise<Event | undefined> {
    const event = await this.eventRepository.findOne({
      where: {
        name,
      },
    });
    return event;
  }

  async findById(id: string): Promise<Event | undefined> {
    const event = await this.eventRepository.findOne({
      where: {
        id,
      },
    });
    return event;
  }

  async createEvent(event: Event): Promise<Event> {
    return this.eventRepository.save(event);
  }

  async deleteById(id: string): Promise<DeleteResult> {
    return this.eventRepository.softDelete({ id });
  }

  async updateById(id: string, event: Event): Promise<UpdateResult> {
    return this.eventRepository.update(id, event);
  }

  async selectAll(options: FindManyOptions<Event>):
    Promise<Array<Event> | null> {
    return this.eventRepository.find(options);
  }
}

export default EventRepository;
