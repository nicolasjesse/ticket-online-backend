import {
  Column,
  Entity,
  OneToMany,
} from 'typeorm';
import Base from './base';
import Ticket from './ticket';

@Entity('users')
class User extends Base {
  @Column()
  name: string;

  @Column({ unique: true })
  email: string;

  @Column({ select: false })
  password: string;

  @Column({ select: false, nullable: true })
  public token?: string;

  @Column({ type: 'int4' })
  public profileType?: number;

  @OneToMany(() => Ticket, (ticket) => ticket.event)
  public tickets?: Ticket[];
}

export default User;
