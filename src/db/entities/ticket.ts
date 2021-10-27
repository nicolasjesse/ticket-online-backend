import {
  Column,
  Entity,
  JoinColumn,
  OneToMany,
} from 'typeorm';
import User from './user';
import Event from './event';
import Base from './base';

@Entity('tickets')
class Ticket extends Base {
  @Column({ type: 'int4' })
  public paymentStatus?: number;

  @Column({ type: 'uuid' })
  public userId: string;

  @Column({ type: 'uuid' })
  public eventId: string;

  @OneToMany(() => User, (user) => user.ticketsTable)
  @JoinColumn({ name: 'userId', referencedColumnName: 'id' })
  public userTable?: User[]

  @OneToMany(() => Event, (event) => event.ticketsTable)
  @JoinColumn({ name: 'eventId', referencedColumnName: 'id' })
  public eventTable?: Event[]
}

export default Ticket;
