import { RJSFSchema } from '@rjsf/utils';
import { Button, Popover } from 'antd';

interface SchemaFormProps {
  schema: RJSFSchema;
}

function HelpPopover(props: SchemaFormProps) {
    const {schema} = props;  
  return (
    <>
    <Popover
      trigger='click'
      placement='bottom'
      content={schema.help_text}
    >
      <Button type='primary'>
      Help
    </Button>
    </Popover>
  </>
  );
}

export default HelpPopover;
