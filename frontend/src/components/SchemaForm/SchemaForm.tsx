import { RJSFSchema } from '@rjsf/utils';
import validator from '@rjsf/validator-ajv8';
import Form from '@rjsf/antd';
import { Alert } from 'antd';
import SchemField from '../SchemaField/SchemaField';

interface SchemaFormProps {
  schema: RJSFSchema;
  error?: string;
  onSubmit: (formData: Record<string, unknown>) => void;
}

function SchemaForm(props: SchemaFormProps) {
  return (
    <>
      {props.error ? <Alert type="error" message={props.error}/> : null}
      <Form
        schema={props.schema}
        validator={validator}
        onSubmit={({ formData }) => props.onSubmit(formData)}
        templates={{ WrapIfAdditionalTemplate: SchemField }}
        showErrorList='bottom'
      />
    </>
  );
}

export default SchemaForm;
