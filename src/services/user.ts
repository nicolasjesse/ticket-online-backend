import { inject, injectable } from 'inversify';
import { Request, Response } from 'express';
import httpStatus from 'http-status';
import bcrypt from 'bcryptjs';
import User from '../db/entities/user';
import UserRepository from '../db/repositories/user';

@injectable()
export class UserService {
  constructor(@inject('UserRepository') private userRepository: UserRepository) {
    this.userRepository = userRepository;
  }

  index(req: Request, res: Response): Response<any> {
    return res.send({ userID: req.userId });
  }

  async create(req: Request, res: Response): Promise<Response<User>> {
    const {
      name, email, password, profileType,
    } = req.body;
    const hashPassword = bcrypt.hashSync(password, 8);

    const userExists = await this.userRepository.findByEmail(email);

    if (userExists) {
      return res.sendStatus(httpStatus.CONFLICT);
    }
    const user: User = await this.userRepository.createUser({
      name,
      email,
      password: hashPassword,
      profileType,
    });

    return res.json(user.email);
  }

  async update(req: Request, res: Response): Promise<Response<User>> {
    const userToUpdate: User = {
      ...req.body.name && { name: req.body.name },
      ...req.body.email && { email: req.body.email },
      ...req.body.password && { password: req.body.password },
      ...req.body.profileType && { profileType: req.body.profileType },
    };

    await this.userRepository.updateById(req.params.id, userToUpdate);
    const column: User = await this.userRepository.findById(req.params.id);
    return res.json(column);
  }

  async delete(req: Request, res: Response): Promise<Response> {
    await this.userRepository.deleteById(req.params.id);
    return res.json(httpStatus[200]);
  }

  async getById(req: Request, res: Response): Promise<Response> {
    const user: User = await this.userRepository.findById(req.params.id);
    return res.json(user);
  }

  async getAll(_req: Request, res: Response): Promise<Response<Array<User | null>>> {
    const usersAll: User[] = await this.userRepository.selectAll({
      select: ['id', 'name', 'email'],
      order: { email: 'ASC' },
    });
    return res.json(usersAll);
  }
}
