import React from 'react';
import styled from 'styled-components';
import { tokens } from './tokens';

// Project imports
import Text from './Text';

const Slider = (props) => {
  return (
    <SliderContainer>
      <Label>
        {props.label && (
          <Text variant="medium14" color={tokens.colors.primaryDark4}>
            {props.label}
          </Text>
        )}
      </Label>
      <SliderInput type="range" {...props} />
    </SliderContainer>
  );
};

// Styled components

const SliderContainer = styled.div`
  width: 100%;
`;

const Label = styled.div`
  margin-bottom: 2px;
`;

const SliderInput = styled.input`
  border-radius: 24px;
  -webkit-appearance: none;
  width: 100%;
  height: 2px;
  background: ${tokens.colors.primaryLight4};
  outline: none;
  opacity: 0.7;
  transition: opacity 0.2s;
  -webkit-transition: 0.2s;

  &:hover {
    opacity: 1;
  }

  &::-webkit-slider-thumb {
    -webkit-appearance: none;
    appearance: none;
    width: 20px;
    height: 20px;
    border-radius: 24px;
    background: ${tokens.colors.primary};
    cursor: pointer;
  }

  &::-moz-range-thumb {
    width: 20px;
    height: 20px;
    border-radius: 24px;
    background: ${tokens.colors.primary};
    cursor: pointer;
  }
`;

export default Slider;
