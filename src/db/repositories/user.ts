import { injectable } from 'inversify';
import {
  getRepository,
  Repository,
  DeleteResult,
  FindManyOptions,
  UpdateResult,
} from 'typeorm';
import User from '../entities/user';

@injectable()
class UserRepository {
  private userRepository: Repository<User> = getRepository(User);

  async findByName(name: string): Promise<User | undefined> {
    const user = await this.userRepository.findOne({
      where: {
        name,
      },
    });
    return user;
  }

  async findById(id: string): Promise<User | undefined> {
    const user = await this.userRepository.findOne({
      where: {
        id,
      },
    });
    return user;
  }

  async findByEmail(email: string): Promise<User | undefined> {
    const user = await this.userRepository.findOne({
      where: {
        email,
      },
    });
    return user;
  }

  async createUser(user: User): Promise<User> {
    return this.userRepository.save(user);
  }

  async deleteById(id: string): Promise<DeleteResult> {
    return this.userRepository.softDelete({ id });
  }

  async updateById(id: string, user: User): Promise<UpdateResult> {
    return this.userRepository.update(id, user);
  }

  async selectAll(options: FindManyOptions<User>):
    Promise<Array<User> | null> {
    return this.userRepository.find(options);
  }
}

export default UserRepository;
