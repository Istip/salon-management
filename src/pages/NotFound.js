import React from 'react';
import styled from 'styled-components';

// project components
import FlexCenter from '../components/UI/FlexCenter';

const NotFound = () => {
  return (
    <Wrapper>
      <FlexCenter>
        <p>There's nothing here!</p>
      </FlexCenter>
    </Wrapper>
  );
};

// styled components
const Wrapper = styled.div`
  width: 100%;
  height: 100vh;
  border: 1px solid red;
`;

export default NotFound;
