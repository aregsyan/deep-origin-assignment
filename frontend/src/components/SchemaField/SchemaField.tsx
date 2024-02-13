import React, { useMemo } from 'react';
import { WrapIfAdditionalTemplateProps } from '@rjsf/utils';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { library } from '@fortawesome/fontawesome-svg-core';
import  {IconDefinition} from '@fortawesome/free-solid-svg-icons';
import  * as allExported from '@fortawesome/free-solid-svg-icons';
import HelpPopover from '../HelpPopover/HelpPopover';

import './SchemaFieldStyles.css';

const allIcons = Object.values(allExported).filter((v) => typeof v === 'object' && v.prefix && v.iconName && v.icon); 
library.add(...allIcons as IconDefinition[]);

export const SchemField = (props: WrapIfAdditionalTemplateProps) => {
  const { schema, children, classNames, style } = props;

  const content = useMemo(() => {
    const icon = schema.fa_icon ? <FontAwesomeIcon icon={schema.fa_icon.split(' ')} /> : null;

    if (!schema.help_text) {
      return (
        <>
          {icon}
          {children}
        </>
      );
    }
    // if(schema.type === 'object' && schema.help_text) {
    //   return (
    //     <>
    //       <HelpPopover schema={schema} />
    //       {icon}
    //       {children}
    //     </>
    //   );
    // }

    return (
      <>
        {icon}
        {children}
        <HelpPopover schema={schema} />
      </>
    );
  }, [schema, children]);

  if (schema.hidden) return null;

  if(schema.type === 'object' && schema.properties) {
    if(Object.values(schema.properties).every((prop) => Object.hasOwnProperty.call(prop, 'hidden'))) {
      return null;
    }
  }

  return (
    <div className={classNames} style={style}>
      {content}
    </div>
  );
}

export default SchemField;
