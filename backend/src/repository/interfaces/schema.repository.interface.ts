import { SchemaInterface } from './schema.interface';

export interface Repository<T> {
  add(data: { [k: string]: unknown }): T;
  get(k: string): T | null;
}

export interface SchemaRepository extends Repository<SchemaInterface> {
  add(schema: {
    schemaUrl: string;
    schema: Record<string, unknown>;
  }): SchemaInterface;
  get(key: string): SchemaInterface | null;
  getByUrl(schemaUrl: string): SchemaInterface | null;
}
