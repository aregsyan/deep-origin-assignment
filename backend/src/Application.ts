import { inject, injectable } from 'inversify';
import { TYPES } from './types';
import express, { Express } from 'express';
import { SchemaRouter } from './routes/schema.router';
import cors from 'cors';

@injectable()
export class Application {
  private readonly app: Express;
  constructor(@inject(TYPES.SchemaRouter) private schemaRouter: SchemaRouter) {
    this.app = express();
    this.app.use(cors());
    this.app.use(express.json());
    this.app.use((req, res, next) => {
      console.log(req.method);
      console.log(req.body);
      console.log(req.url);
      next();
    });
    this.initRoutes();
  }

  private initRoutes() {
    this.app.use(express.json());
    this.app.use('/schema', this.schemaRouter.getRouter());
  }

  async start(port: number) {
    this.app.listen(port, () => {
      console.log(`Server started at http://localhost:${port}`);
    });
  }

  async stop() {
    console.log('Stopping application');
  }
}
