import { inject, injectable } from 'inversify';
import { SchemaInterface } from '../repository/interfaces/schema.interface';
import { SchemaRepository } from '../repository/interfaces/schema.repository.interface';
import { TYPES } from '../types';
import { SchemaParser, HttpClient, SchemaValidator } from './interfaces';
import { Draft07, JsonSchema, resolveRefMerge } from 'json-schema-library';

@injectable()
export class SchemaService {
  constructor(
    @inject(TYPES.SchemaRepository)
    private readonly schemaRepository: SchemaRepository,
    @inject(TYPES.SchemaParser) private readonly schemaParser: SchemaParser,
    @inject(TYPES.HttpClient) private readonly httpClient: HttpClient,
    @inject(TYPES.SchemaValidator)
    private readonly schemaValidator: SchemaValidator,
  ) {}

  async add(schemaUrl: string): Promise<SchemaInterface> {
    const existingSchema = this.schemaRepository.getByUrl(schemaUrl);
    if (existingSchema) {
      return existingSchema;
    }
    const schema = await this.httpClient.get<Record<string, unknown>>({
      url: schemaUrl,
    });
    console.log('schema', schema);
    const jsonSchema = new Draft07(schema, {
      resolveRef: resolveRefMerge,
    });
    const parsedSchema = jsonSchema.getSchema();
    return this.schemaRepository.add({
      schemaUrl,
      schema: parsedSchema as Record<string, unknown>,
    });
  }

  submit({ id, formData }: { id: string; formData: Record<string, unknown> }) {
    const schemaObj = this.schemaRepository.get(id);
    if (!schemaObj) {
      throw new Error('Schema with given id not found');
    }
    let parsedSchema: Record<string, unknown>;
    if (typeof schemaObj.schema === 'string') {
      parsedSchema = this.schemaParser.parseSchema(schemaObj.schema);
    } else {
      parsedSchema = schemaObj.schema;
    }
    const validatedData = this.schemaValidator.validateSchema({
      schema: parsedSchema,
      formData,
    });
    return validatedData;
  }
}
