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

  async findByName(name: string): Promise<Ticket | undefined> {
    const ticket = await this.ticketRepository.findOne({
      where: {
        name,
      },
    });
    return ticket;
  }

  async findById(id: string): Promise<Ticket | undefined> {
    const ticket = await this.ticketRepository.findOne({
      where: {
        id,
      },
    });
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
    return this.ticketRepository.find(options);
  }
}

export default TicketRepository;
