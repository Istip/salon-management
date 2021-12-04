import React from 'react';
import styled from 'styled-components';
import { tokens } from './tokens';

// project imports
import Text from './Text';
import LogoIcon from '../../assets/Logo';
import FlexCenter from './FlexCenter';

const Logo = (props) => {
  if (props.large) {
    return (
      <FlexCenter style={{ flexDirection: 'column', gap: '5px' }}>
        <LogoIcon size="60" />
        <Text variant="black10" color={tokens.colors.primaryLight2}>
          SMANAGER
        </Text>
      </FlexCenter>
    );
  }

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
