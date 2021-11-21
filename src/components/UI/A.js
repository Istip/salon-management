import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { tokens } from './tokens';

const A = (props) => {
  return <AWrapper {...props}>{props.children}</AWrapper>;
};

const AWrapper = styled(Link)`
  text-decoration: none;
  color: ${tokens.colors.primary};
  transition: 250ms ease;

  &:hover {
    color: ${tokens.colors.primaryDark1};
  }
`;

export default A;
