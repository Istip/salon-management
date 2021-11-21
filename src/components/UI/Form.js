import React from 'react';
import styled from 'styled-components';

const Form = (props) => {
  return <FormWrapper {...props}>{props.children}</FormWrapper>;
};

const FormWrapper = styled.form``;

export default Form;
