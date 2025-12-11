// Extend the Request interface from Express
declare namespace Express {
    export interface Request {
      user?: {
        id: string;
      };
    }
}
