import React from 'react';
import styled from 'styled-components';
import { tokens } from './tokens';

// project components
import FlexCenter from './FlexCenter';
import Text from './Text';

const Error = (props) => {
  return (
    <ErrorWrapper>
      <FlexCenter>
        <Text variant="medium12">{props.children}</Text>
      </FlexCenter>
    </ErrorWrapper>
  );
};

// styled components
const ErrorWrapper = styled.div`
  border: 1px solid ${tokens.colors.error};
  color: ${tokens.colors.error};
  background: ${tokens.colors.error + '22'};
  margin: 20px 10px;
  padding: 20px;
  border-radius: 12px;
`;

export default Error;
