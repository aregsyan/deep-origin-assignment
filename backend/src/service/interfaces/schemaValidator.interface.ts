export interface SchemaValidator {
  validateSchema({
    schema,
    formData,
  }: {
    schema: Record<string, unknown>;
    formData: Record<string, unknown>;
  }): {
    isValid: boolean;
    errors?: { message: string; details: Record<string, unknown> }[];
  };
}
