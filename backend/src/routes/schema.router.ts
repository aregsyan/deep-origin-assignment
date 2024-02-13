import { Router } from 'express';
import { inject, injectable } from 'inversify';
import { SchemaController } from '../controller/schema.controller';
import { TYPES } from '../types';

@injectable()
export class SchemaRouter {
  private readonly schemaController: SchemaController;
  private readonly router: Router;
  constructor(
    @inject(TYPES.SchemaController) schemaController: SchemaController,
  ) {
    this.schemaController = schemaController;
    this.router = Router();
    this.router.post(
      '/add',
      this.schemaController.add.bind(this.schemaController),
    );
    this.router.post(
      '/submit',
      this.schemaController.submit.bind(this.schemaController),
    );
  }

  public getRouter() {
    return this.router;
  }
}
