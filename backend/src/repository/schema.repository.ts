import { injectable } from 'inversify';
import { SchemaRepository } from './interfaces/schema.repository.interface';
import { SchemaInterface } from './interfaces/schema.interface';

@injectable()
export class InMemorySchemaRepository implements SchemaRepository {
  private readonly storage: Record<string, Record<string, unknown>> = {};

  add({
    schemaUrl,
    schema,
  }: {
    schemaUrl: string;
    schema: Record<string, unknown>;
  }): SchemaInterface {
    const key = Buffer.from(schemaUrl).toString('base64');
    this.storage[key] = schema;
    return { id: key, schema };
  }

  get(id: string): SchemaInterface | null {
    if (this.storage[id]) {
      return { id, schema: this.storage[id] };
    }
    return null;
  }

  getByUrl(schemaUrl: string): SchemaInterface | null {
    const key = Buffer.from(schemaUrl).toString('base64');
    return this.get(key);
  }
}
