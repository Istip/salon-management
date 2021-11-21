import React from 'react';
import styled from 'styled-components';
import { tokens } from './tokens';

const Input = (props) => {
  return (
    <InputContainer>
      <Label>
        {props.label}
        <InputWrapper>
          <InputField {...props} />
        </InputWrapper>
      </Label>
    </InputContainer>
  );
};

// styled components

const InputContainer = styled.div`
  margin-bottom: 20px;
  color: #111;
`;

const InputField = styled.input`
  width: 100%;
  margin-top: 2px;
  padding: 12px;
  outline: none;
  color: ${tokens.colors.primaryDark4};
  background: ${tokens.colors.primaryLight4};
  border: 1px solid ${tokens.colors.primaryLight4};
  border-radius: 4px;
  font-size: 16px;
  height: 48px;
  transition: 250ms ease;

  &::placeholder {
    color: ${tokens.colors.primaryLight3};
  }

  &:hover {
    border: 1px solid ${tokens.colors.primaryDark1};
  }

  &:focus {
    border: 1px solid ${tokens.colors.primaryDark2};
  }
`;

const InputWrapper = styled.span`
  overflow: hidden;
`;

const Label = styled.label`
  color: ${tokens.colors.primaryDark4};
  font-size: 14px;
  font-weight: 600;
`;

export default Input;
