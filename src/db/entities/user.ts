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

  @Column()
  password: string;

  @Column({ type: 'int4' })
  public profileType?: number;
}

export default User;
