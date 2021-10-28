import {
  NextFunction, Request, Response, json, urlencoded, 
} from 'express';
import * as httpStatus from 'http-status';
import cors from 'cors';
import helmet from 'helmet';
import { v4 } from 'uuid';
import { InversifyExpressServer } from 'inversify-express-utils';
import { Container } from 'inversify';
import './db/database';
import './controllers';
import { UserService } from './services/user';
import { EventService } from './services/event';
import { TicketService } from './services/ticket';
import { AuthService } from './services/auth';
import UserRepository from './db/repositories/user';
import EventRepository from './db/repositories/event';
import TicketRepository from './db/repositories/ticket';

const container = new Container();

export default class Server {
  constructor() {
    this.configDependencies();
    this.createServer();
  }

  configDependencies(): void {
    container.bind<AuthService>('AuthService').to(AuthService);
    container.bind<UserService>('UserService').to(UserService);
    container.bind<EventService>('EventService').to(EventService);
    container.bind<TicketService>('TicketService').to(TicketService);
    container.bind<UserRepository>('UserRepository').to(UserRepository);
    container.bind<EventRepository>('EventRepository').to(EventRepository);
    container.bind<TicketRepository>('TicketRepository').to(TicketRepository);
  }

  createServer(): void {
    const server: InversifyExpressServer = new InversifyExpressServer(container);

    server.setConfig((app) => {
      app.use(urlencoded({
        extended: true,
        limit: '10mb',
      }));

      app.use(json({
        limit: '10mb',
      }));

      app.disable('etag');

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
