import React from 'react';
import styled, { keyframes } from 'styled-components';
import { tokens } from './tokens';

const Loading = (props) => {
  return (
    <LoadingWrapper>
      <LoadingIcon {...props} />
    </LoadingWrapper>
  );
};

// styled components

const rotation = keyframes`
  from {
    transform: rotate(0deg);
  }

  to {
    transform: rotate(360deg);
  }
`;

const LoadingWrapper = styled.div`
  padding: 4px;
  width: 100%;
  height: 100%;
`;

const LoadingIcon = styled.div`
  border: 2px solid ${tokens.colors.white};
  border-top: 2px solid ${tokens.colors.primary};
  border-radius: 50%;
  width: ${({ size }) => size || '100px'};
  height: ${({ size }) => size || '100px'};
  animation: ${rotation} 1s infinite linear;
`;

export default Loading;
