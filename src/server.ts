import { NextFunction, Request, Response } from 'express';
import * as bodyParser from 'body-parser';
import * as httpStatus from 'http-status';
import cors from 'cors';
import compress from 'compression';
import helmet from 'helmet';
import { v4 } from 'uuid';
import { InversifyExpressServer } from 'inversify-express-utils';
import { Container } from 'inversify';
import './db/database';
import './controllers';
import { UserService } from './services/user';
import { AuthService } from './services/auth';
import UserRepository from './db/repositories/user';

const container = new Container();

export default class Server {
  constructor() {
    this.configDependencies();
    this.createServer();
  }

  configDependencies(): void {
    container.bind<AuthService>('AuthService').to(AuthService);
    container.bind<UserService>('UserService').to(UserService);
    container.bind<UserRepository>('UserRepository').to(UserRepository);
  }

  createServer(): void {
    const server: InversifyExpressServer = new InversifyExpressServer(container);

    server.setConfig((app) => {
      app.use(bodyParser.urlencoded({
        extended: true,
        limit: '10mb',
      }));

      app.use(bodyParser.json({
        limit: '10mb',
      }));

      app.disable('etag');

      app.use(compress());

      app.use(helmet());

      app.use(cors());

      app.use((req: Request, _res: Response, next: NextFunction): void => {
        req.headers['X-Request-ID'] = v4();
        next();
      });
    });

    server.setErrorConfig((app): void => {
      app.use((_req: Request, res: Response): void => {
        res.status(httpStatus.NOT_FOUND);
      });
    });

    const app = server.build();
    app.listen(3002, (): void => console.log(`ONLINE ${3002}`));
  }
}
