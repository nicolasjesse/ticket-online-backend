declare namespace Express {
  export interface Request {
    userId: string;
    eventId: string;
    user: any;
  }
}
