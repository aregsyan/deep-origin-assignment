import 'reflect-metadata';
import { Container } from 'inversify';
import { TYPES } from './types';
import { SchemaController } from './controller/schema.controller';
import { SchemaService } from './service/schema.service';
import { SchemaRepository } from './repository/interfaces/schema.repository.interface';
import { InMemorySchemaRepository } from './repository/schema.repository';
import { Application } from './Application';
import { JSONSchemaParser } from './service/schemaParser';
import {
  HttpClient,
  SchemaValidator,
  SchemaParser,
} from './service/interfaces';
import { AxiosHttpClient } from './service/axiosHttpClient';
import { AjvSchemaValidator } from './service/ajvSchemaValidator';
import { SchemaRouter } from './routes/schema.router';

const container = new Container();

container
  .bind<SchemaRouter>(TYPES.SchemaRouter)
  .to(SchemaRouter)
  .inSingletonScope();
container
  .bind<SchemaController>(TYPES.SchemaController)
  .to(SchemaController)
  .inSingletonScope();
container
  .bind<SchemaRepository>(TYPES.SchemaRepository)
  .to(InMemorySchemaRepository)
  .inSingletonScope();
container
  .bind<SchemaService>(TYPES.SchemaService)
  .to(SchemaService)
  .inSingletonScope();
container
  .bind<Application>(TYPES.Application)
  .to(Application)
  .inSingletonScope();
container
  .bind<SchemaParser>(TYPES.SchemaParser)
  .to(JSONSchemaParser)
  .inSingletonScope();
container
  .bind<HttpClient>(TYPES.HttpClient)
  .to(AxiosHttpClient)
  .inSingletonScope();
container
  .bind<SchemaValidator>(TYPES.SchemaValidator)
  .to(AjvSchemaValidator)
  .inSingletonScope();

export default container;
