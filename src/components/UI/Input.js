import React from 'react';
import styled from 'styled-components';
import { tokens } from './tokens';

const Input = (props) => {
  return (
    <InputContainer>
      <Label>{props.label}</Label>
      <InputWrapper>
        <span>{props.icon}</span>
        <InputField {...props} />
      </InputWrapper>
    </InputContainer>
  );
};

// styled components

const InputContainer = styled.div`
  margin-bottom: 20px;
  color: #111;
`;

const InputWrapper = styled.span`
  position: relative;

  span {
    width: 48px;
    height: 48px;
    position: absolute;
    top: -14px;
    display: flex;
    align-items: center;
    justify-content: center;
  }
`;

const InputField = styled.input`
  width: 100%;
  margin-top: 2px;
  padding: ${(props) => (props.icon ? '12px 12px 12px 42px' : '12px')};
  outline: none;
  color: ${tokens.colors.primaryDark4};
  background: ${tokens.colors.primaryLight4};
  border: 1px solid ${tokens.colors.primaryLight4};
  border-radius: 4px;
  font-size: 16px;
  height: 48px;
  transition: 250ms ease;

  &:hover {
    border: 1px solid ${tokens.colors.primaryDark1};
  }

  &:focus {
    border: 1px solid ${tokens.colors.primaryDark1};
  }
`;

const Label = styled.div`
  color: ${tokens.colors.primaryDark4};
  font-size: 14px;
  font-weight: 600;
`;

export default Input;
