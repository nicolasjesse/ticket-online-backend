import { NextFunction, Request, Response } from 'express';
import httpStatus from 'http-status';

export default function allow(alloweds: number[]): any {
  return (req: Request, res: Response, next: NextFunction) => {
    const isAllowed = alloweds.find((allowedType) => allowedType === req.user.profileType);

    if (!isAllowed) {
      return res.sendStatus(httpStatus.UNAUTHORIZED);
    }
    return next();
  };
}
