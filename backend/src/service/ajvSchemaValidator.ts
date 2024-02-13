import { injectable } from 'inversify';
import { SchemaValidator } from './interfaces';
import Ajv, { ErrorObject } from 'ajv';

@injectable()
export class AjvSchemaValidator implements SchemaValidator {
  public validateSchema({
    schema,
    formData,
  }: {
    schema: Record<string, unknown>;
    formData: Record<string, unknown>;
  }): {
    isValid: boolean;
    errors?: {
      message: string;
      details: Record<string, unknown>;
    }[];
  } {
    try {
      const ajv = new Ajv({ strict: false });
      const validate = ajv.compile(schema);
      const valid = validate(formData);
      if (!valid) {
        return {
          isValid: false,
          errors: validate.errors?.map((error) => {
            const { message, dataPath, params } = error;
            return {
              message: message || '',
              details: { dataPath, params },
            };
          }),
        };
      }
      return { isValid: true };
    } catch (error) {
      console.log('error', error);
      console.error(error);
      return {
        isValid: false,
        errors: [{ message: 'Error in schema validation', details: {} }],
      };
    }
  }
}
