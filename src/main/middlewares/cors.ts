import { Request, Response, NextFunction } from 'express';

export const cors = (req: Request, res: Response, next: NextFunction): void => {
  res.removeHeader('X-Powered-By');
  res.set('Content-Security-Policy', "default-src 'self'");
  res.set('X-Content-Type-Options', 'nosniff');
  next();
};
