import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
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

  @Column({ type: 'uuid', select: false })
  public eventId: string;

  @ManyToOne(() => User)
  @JoinColumn({ name: 'userId', referencedColumnName: 'id' })
  public user?: User;

  @ManyToOne(() => Event)
  @JoinColumn({ name: 'eventId', referencedColumnName: 'id' })
  public event?: Event;
}

export default Ticket;
