import React from 'react';
import styled from 'styled-components';

const FlexCenter = (props) => {
  return <FlexCenterWrapper {...props}>{props.children}</FlexCenterWrapper>;
};

// styled components
const FlexCenterWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`;

export default FlexCenter;
