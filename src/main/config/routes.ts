import { Express, Router } from 'express';
import healthyRouter from '../routes/healthcheck';
import productRouter from '../routes/product-routes';
import swaggerRoutes from '../doc/swagger-config';

export default (app: Express): void => {
  const router = Router();
  app.use('/', swaggerRoutes);
  app.use('/api', router);
  productRouter(router);
  healthyRouter(router);
  app.use((_req, res) => {
    res.set('Content-Security-Policy', "default-src 'self'")
        .status(404)
        .send('Resource not found');
});
};
