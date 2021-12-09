import React from 'react';
import styled from 'styled-components';

const FlexBetween = (props) => {
  return <FlexBetweenWrapper {...props}>{props.children}</FlexBetweenWrapper>;
};

// styled components
const FlexBetweenWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
`;

export default FlexBetween;
