import React from 'react';
import styled from 'styled-components';

// project imports
import Text from './Text';
import LogoIcon from '../../assets/Logo';
import { tokens } from './tokens';

const Logo = () => {
  return (
    <LogoWrapper>
      <LogoIcon size="16" />
      <Text variant="black10" color={tokens.colors.primaryLight2}>
        SMANAGER
      </Text>
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

export default Logo;
