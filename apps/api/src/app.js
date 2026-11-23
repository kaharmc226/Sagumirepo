import express from 'express';
import cors from 'cors';
import { env } from './config/env.js';
import { errorHandler, notFoundHandler } from './middleware/errorHandler.js';
import productsRouter from './routes/products.routes.js';

const app = express();

app.use(
  cors({
    origin: env.corsOrigin.split(',').map((o) => o.trim()),
    credentials: true,
  }),
);
app.use(express.json());

app.get('/api/v1/health', (_req, res) => {
  res.json({
    success: true,
    data: {
      status: 'ok',
      service: 'sagumi-api',
      env: env.nodeEnv,
    },
  });
});

app.use('/api/v1/products', productsRouter);

app.use(notFoundHandler);
app.use(errorHandler);

export default app;
