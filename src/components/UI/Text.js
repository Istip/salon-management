import React from 'react';
import { fonts } from '../UI/tokens';

const Text = ({ variant, tag, children, color, ...props }) => {
  const Tag = tag || 'p';
  return (
    <Tag style={{ ...fonts[variant], color }} {...props}>
      {children}
    </Tag>
  );
};

export default Text;
