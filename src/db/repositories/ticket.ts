import { injectable } from 'inversify';
import {
  getRepository,
  Repository,
  DeleteResult,
  FindManyOptions,
  UpdateResult,
} from 'typeorm';
import Ticket from '../entities/ticket';

@injectable()
class TicketRepository {
  private ticketRepository: Repository<Ticket> = getRepository(Ticket);

  async findById(id: string): Promise<Ticket | undefined> {
    const ticket = await this.ticketRepository.createQueryBuilder('tickets')
      .leftJoinAndSelect('tickets.event', 'events')
      .where({ id })
      .getOne();
    return ticket;
  }

  async createTicket(ticket: Ticket): Promise<Ticket> {
    return this.ticketRepository.save(ticket);
  }

  async deleteById(id: string): Promise<DeleteResult> {
    return this.ticketRepository.softDelete({ id });
  }

  async updateById(id: string, ticket: Ticket): Promise<UpdateResult> {
    return this.ticketRepository.update(id, ticket);
  }

  async selectAll(options: FindManyOptions<Ticket>):
    Promise<Array<Ticket> | null> {
    const tickets: Ticket[] = await this.ticketRepository.createQueryBuilder('tickets')
      .leftJoinAndSelect('tickets.event', 'events')
      .leftJoinAndSelect('tickets.user', 'users')
      .where(options.where)
      .getMany();
    return tickets;
  }
}

export default TicketRepository;
