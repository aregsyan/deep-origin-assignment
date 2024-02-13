export interface SchemaParser {
  parseSchema(schemaUrl: string): Record<string, unknown>;
}
