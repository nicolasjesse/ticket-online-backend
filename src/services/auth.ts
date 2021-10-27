import { injectable } from 'inversify';
import { Request, Response } from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import httpStatus from 'http-status';
import UserRepository from '../db/repositories/user';

@injectable()
export class AuthService {
  async authenticate(req: Request, res: Response): Promise<Response<any>> {
    const repository = new UserRepository();
    const { email, password } = req.body;

    const user = await repository.findByEmail(email);

    if (!user) {
      return res.sendStatus(httpStatus.UNAUTHORIZED);
    }

    const isValidPassword = await bcrypt.compare(password, user.password);

    if (!isValidPassword) {
      return res.sendStatus(httpStatus.UNAUTHORIZED);
    }
    const token = jwt.sign({ id: user.id }, process.env.SECRET_KEY, { expiresIn: '1d' });
    delete user.password;

    repository.updateById(user.id, {
      ...user,
      token,
    });
    return res.json({
      token,
      id: user.id,
    });
  }
}
