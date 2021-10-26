import { inject, injectable } from 'inversify';
import { Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import httpStatus from 'http-status';
import bcrypt from 'bcryptjs';
import User from '../db/entities/user';
import UserRepository from '../db/repositories/user';

interface TokenPayload {
  id: string;
  iat: string;
  exp: string;
}

@injectable()
export class UserService {
  constructor(@inject('UserRepository') private userRepository: UserRepository) {
    this.userRepository = userRepository;
  }

  index(req: Request, res: Response): Response<any> {
    return res.send({ userID: req.userId });
  }

  async create(req: Request, res: Response): Promise<Response<User>> {
    const { email, password } = req.body;
    const hashPassword = bcrypt.hashSync(password, 8);

    const userExists = await this.userRepository.findByEmail(email);

    if (userExists) {
      return res.sendStatus(httpStatus.CONFLICT);
    }
    const user: User = await this.userRepository.createUser({
      email,
      password: hashPassword,
    });

    return res.json(user.email);
  }

  async getMe(req: Request, res: Response): Promise<Response | string> {
    const { authorization } = req.headers;
    if (!authorization) {
      return res.sendStatus(401);
    }

    const token = authorization.replace('Bearer', '').trim();

    try {
      const data = jwt.verify(token, process.env.SECRET_KEY);
      const { id } = data as TokenPayload;
      const user = await this.userRepository.findById(id);
      delete user.password;

      return res.json(user as User);
    } catch {
      return res.sendStatus(401);
    }
  }

  async update(req: Request, res: Response): Promise<Response<User>> {
    const userToUpdate: User = {
      ...req.body.email && { email: req.body.email },
      ...req.body.password && { password: req.body.password },
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
      select: ['email', 'password'],
      order: { email: 'ASC', password: 'DESC' },
    });
    return res.json(usersAll);
  }
}
