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
        {props.clearable && props.value && (
          <small onClick={props.handleClear}>✖</small>
        )}
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
    position: absolute;
    top: -2px;
    left: 10px;
  }

  small {
    position: absolute;
    top: -12px;
    right: 0;
    cursor: pointer;
    padding: 12px;
    color: ${tokens.colors.error};
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
