import {
  Column,
  Entity,
} from 'typeorm';
import Base from './base';

@Entity('users')
class User extends Base {
  @Column()
  name: string;

  @Column()
  email: string;

  @Column({ select: false })
  password: string;

  @Column({ select: false, nullable: true })
  public token?: string;

  @Column({ type: 'int4' })
  public profileType?: number;
}

export default User;
