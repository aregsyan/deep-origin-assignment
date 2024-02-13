import { useCallback, useState } from 'react';
import {RJSFSchema} from '@rjsf/utils';
import SchemaForm from './components/SchemaForm/SchemaForm';
import AddSchemaForm from './components/AddSchemaForm/AddSchemaForm';
import { submitForm, addSchema } from './api/schema.api';

function App() {
  const [schema, setSchema] = useState<{ id: string; schema: Record<string, unknown> } | null>(null);
  const [addSchemaError, setAddSchemaError] = useState('');
  const [submitFormError, setSubmitFormError] = useState('');

  const handleAddSchema = useCallback(async (url: string) => {
    if(!url)  return setAddSchemaError('URL is required');
    try {
      const {id, schema} = await addSchema(url);  
      console.log(schema);
      setSchema({ id, schema });
    } catch(error: any) {
      console.error(error);
      setAddSchemaError(error?.message);
    }
  }, []);

  const handleSubmitForm = useCallback(async (formData: Record<string, any>) => {
    try {
      const resourceData = await submitForm(schema?.id as string, formData);
      console.log(resourceData);
    } catch(error: any) {
      console.error(error);
      setSubmitFormError(error?.message);
    }
  }, [schema]);
  
  return (
    <div className="App">
      {!schema && <AddSchemaForm error={addSchemaError} onSubmit={handleAddSchema} />}
      {schema && <SchemaForm
        error={submitFormError}
        schema={schema.schema as RJSFSchema}
        onSubmit={handleSubmitForm}
      />}
    </div>
  );
}

export default App;
