import React from 'react';
import styled from 'styled-components';
import { tokens } from './tokens';

const Logo = () => {
  return (
    <LogoWrapper>
      <LogoIcon />
      <LogoText>SMANAGER</LogoText>
    </LogoWrapper>
  );
};

// styled components

const LogoWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 5px;
`;

const LogoIcon = styled.div`
  border-radius: 50%;
  width: 12px;
  height: 12px;
  background: ${tokens.colors.primaryLight2};
`;

const LogoText = styled.div`
  color: ${tokens.colors.primaryLight2};
  font-size: 10px;
  font-weight: 900;
`;

export default Logo;
