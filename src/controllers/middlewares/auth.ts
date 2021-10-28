import { Request, Response, NextFunction } from 'express';
import { getRepository, Repository } from 'typeorm';
import jwt from 'jsonwebtoken';
import httpStatus from 'http-status';
import User from '../../db/entities/user';
import { TokenPayload } from '../../models/token';

export default async function auth(
  req: Request, res: Response, next: NextFunction,
): Promise<any> {
  if (req.headers.authorization) {
    const userRepository: Repository<User> = getRepository(User);
    const token = jwt.verify(req.headers.authorization, process.env.SECRET_KEY);
    const { id } = token as TokenPayload;
    const user = await userRepository.findOne({ where: { id } });
    req.user = user;
    return next();
  }
  return res.sendStatus(httpStatus.UNAUTHORIZED);
}
