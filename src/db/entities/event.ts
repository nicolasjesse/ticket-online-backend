import {
  Column,
  Entity,
} from 'typeorm';
import Base from './base';

@Entity('events')
class Event extends Base {
  @Column()
  name: string;

  @Column()
  local: string;

  @Column()
  date: string;

  @Column()
  schedule: string;

  @Column({ type: 'float' })
  price: number;

  @Column({ type: 'int4' })
  quantity: number;

  @Column({ type: 'int4' })
  public eventType?: number;
}

export default Event;
