import {
  Column,
  Entity,
  ManyToOne,
  JoinColumn,
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

  @ManyToOne(() => Ticket)
  @JoinColumn({ name: 'ticketId', referencedColumnName: 'id' })
  public ticketsTable?: Ticket[];
}

export default User;
