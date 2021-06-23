import { NextFunction, Request, Response } from 'express';

interface Error {
  status: number;
  message: string;
  stack: unknown;
}

export default (error: Error, req: Request, res: Response, next: NextFunction) => {
  console.log(next);
  res.status(error.status || 500);
  res.json({
    success: false,
    message: error.message,
    stack: process.env.NODE_ENV === 'production' ? `👀` : error.stack,
  });
};
