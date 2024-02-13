import { useState } from 'react';
import { Alert, Button, Input, Typography } from 'antd';

import './AddSchemaFormStyles.css';

interface AddSchemaFormProps {
  onSubmit: (url: string) => void;
	error?: string;
}

function AddSchemaForm(props: AddSchemaFormProps) {
	const [value, setValue] = useState('');
	
  return (
    <div className='add-schema-form-container'>
		<Typography.Title level={5}>Add Schema</Typography.Title>
		<Typography.Text>
			Please Add schema url.<br/>
			Example: https://raw.githubusercontent.com/nf-core/scrnaseq/2.4.1/nextflow_schema.json
			</Typography.Text>
			<div className='add-schema-form'>
				<Input value={value} onChange={(e) => setValue(e.target.value)} />
				<Button
					onClick={() => props.onSubmit(value)}
					style={{ marginTop: '15px' }}
					size='large'
					type='primary'
				>
					Add
				</Button>
				{props.error ? <Alert type="error" message={props.error}/> : null}
			</div>
    </div>
  );
}

export default AddSchemaForm;
