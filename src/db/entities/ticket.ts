import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
} from 'typeorm';
import User from './user';
import Event from './event';
import Base from './base';

@Entity('events')
class Ticket extends Base {
  @Column({ type: 'int4' })
  paymentStatus: number;

  @Column({ type: 'uuid' })
  userId: string;

  @Column({ type: 'uuid' })
  eventId: string;

  @ManyToOne(() => User)
  @JoinColumn({ name: 'userId', referencedColumnName: 'id' })
  userTable?: User[]

  @ManyToOne(() => Event)
  @JoinColumn({ name: 'eventId', referencedColumnName: 'id' })
  eventTable?: Event[]
}

export default Ticket;
