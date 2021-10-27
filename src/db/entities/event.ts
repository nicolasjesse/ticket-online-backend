import {
  Column,
  Entity,
  OneToMany,
} from 'typeorm';
import Base from './base';
import Ticket from './ticket';

@Entity('events')
class Event extends Base {
  @Column()
  public name: string;

  @Column()
  public local: string;

  @Column()
  public date: string;

  @Column()
  public schedule: string;

  @Column({ type: 'float' })
  public price: number;

  @Column({ type: 'int4' })
  public quantity: number;

  @Column({ type: 'int4' })
  public eventType?: number;

  @Column({ type: 'uuid' })
  public userId?: string;

  @OneToMany(() => Ticket, (ticket) => ticket.event)
  public tickets?: Ticket[];
}

export default Event;
