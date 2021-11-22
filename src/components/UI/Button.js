import React from 'react';
import styled from 'styled-components';
import { tokens } from './tokens';

const Button = (props) => {
  return (
    <ButtonItem {...props} className={props.variant || 'primary'}>
      <ButtonText>
        <ButtonIcon>{props.icon && props.icon}</ButtonIcon>
        {props.children}
      </ButtonText>
    </ButtonItem>
  );
};

// styled components

const ButtonItem = styled.button`
  height: ${(props) => (props.size === 'small' ? '24px' : '48px')};
  padding: 0 12px;
  width: ${({ block }) => (block ? '100%' : 'auto')};
  display: ${({ block }) => (block ? 'block' : '')};
  text-align: center;
  border-radius: 4px;
  cursor: pointer;
  transition: 250ms ease;

  &:disabled {
    opacity: 0.5;
  }

  &.primary {
    color: ${tokens.colors.white};
    background: ${tokens.colors.primary};
    border: 1px solid ${tokens.colors.primary};
    font-weight: 700;

    &:hover {
      background: ${tokens.colors.primaryDark1};
      border: 1px solid ${tokens.colors.primaryDark1};
    }

    &:active {
      background: ${tokens.colors.primaryDark2};
      border: 1px solid ${tokens.colors.primaryDark2};
    }
  }

  &.secondary {
    color: ${tokens.colors.primary};
    background: ${tokens.colors.primaryLight4};
    border: 1px solid ${tokens.colors.primary};

    &:hover {
      background: ${tokens.colors.primaryLight3};
    }

    &:active {
      background: ${tokens.colors.primaryLight2};
    }
  }

  &.neutral {
    color: ${tokens.colors.darkGrey};
    background: ${tokens.colors.lightGrey};
    border: 1px solid ${tokens.colors.lightGrey};

    &:hover {
      border: 1px solid ${tokens.colors.darkGrey};
    }
  }
`;

const ButtonIcon = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`;

const ButtonText = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 5px;
`;

export default Button;
