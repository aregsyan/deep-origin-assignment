import { injectable } from 'inversify';
import { SchemaParser } from './interfaces';

@injectable()
export class JSONSchemaParser implements SchemaParser {
  public parseSchema(schema: string): Record<string, unknown> {
    return JSON.parse(schema);
  }
}
