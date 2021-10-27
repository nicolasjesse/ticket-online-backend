import {
  Column,
  Entity,
  ManyToOne,
  JoinColumn,
  OneToMany,
} from 'typeorm';
import Base from './base';
import Ticket from './ticket';
import User from './user';

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

  @OneToMany(() => User, (user) => user.ticketsTable)
  @JoinColumn({ name: 'userId', referencedColumnName: 'id' })
  public userTable?: User[]

  @ManyToOne(() => Ticket)
  @JoinColumn({ name: 'ticketId', referencedColumnName: 'id' })
  public ticketsTable?: Ticket[];
}

export default Event;
