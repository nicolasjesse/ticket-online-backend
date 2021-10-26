/* eslint-disable import/extensions */
/* eslint-disable no-new */

import Server from './server';
import { initializeDatabase } from './db/database';
import { initializeEnv } from './constants';

(async (): Promise<void> => {
  await initializeEnv();
  await initializeDatabase();
  new Server();
})().catch((err: any): void => console.error(err));
