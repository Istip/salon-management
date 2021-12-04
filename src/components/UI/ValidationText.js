import React from 'react';
import styled from 'styled-components';
import { tokens } from './tokens';

// project components
import Text from './Text';
import FlexCenter from './FlexCenter';

const ValidationText = (props) => {
  return (
    <ErrorTextWrapper>
      <Text tag="div" variant="medium12" color={tokens.colors.error}>
        <FlexCenter>{props.children}</FlexCenter>
      </Text>
    </ErrorTextWrapper>
  );
};

// styled components

const ErrorTextWrapper = styled.div`
  padding: 10px 20px;
`;

export default ValidationText;
