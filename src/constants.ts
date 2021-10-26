/* eslint-disable import/no-mutable-exports */
import * as dotenv from 'dotenv';

dotenv.config();

export class Constants {
  database: {
    hostWrite: string,
    name: string,
    user: string,
    password: string,
    pool: {
      max: number,
      min: number,
      acquire: number,
      idle: number,
    },
  };

  constructor() {
    this.database = {
      hostWrite: process.env.DATABASE_HOST,
      name: process.env.DATABASE_NAME,
      user: process.env.DATABASE_USER,
      password: process.env.DATABASE_PASSWORD,
      pool: {
        max: parseInt(process.env.DATABASE_POOL_MAX || '10', 10),
        min: parseInt(process.env.DATABASE_POOL_MIN || '1', 10),
        acquire: parseInt(process.env.DATABASE_ACQUIRE || '10000', 10),
        idle: parseInt(process.env.DATABASE_IDLE || '20000', 10) || 10,
      },
    };
  }
}

export let ConstantsEnv: Constants;

export const initializeEnv: any = (): void => {
  ConstantsEnv = new Constants();
};

export const getEnv = (): Constants => ConstantsEnv;
