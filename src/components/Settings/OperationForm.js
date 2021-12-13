import React, { useState } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { useTranslation } from 'react-i18next';
import { useFirestore } from '../../hooks/useFirestore';

// project components
import Form from '../UI/Form';
import Input from '../UI/Input';
import Button from '../UI/Button';
import ValidationText from '../UI/ValidationText';
import AddIcon from '../icons/AddIcon';
import { tokens } from '../UI/tokens';

const OperationForm = ({ user }) => {
  const [operation, setOperation] = useState('');
  const [validation, setValidation] = useState('');

  const { updateDocument } = useFirestore('users');

  const { t } = useTranslation();

  // Function for creating a new operation for the user
  const handleAddOperation = (e) => {
    e.preventDefault();
    const currentUser = user[0];
    const data = { actions: [...currentUser.actions, operation.toLowerCase()] };

    // Validate if the entered operation already exists (case sensitive)
    if (
      currentUser.actions
        .map((item) => item.toLowerCase())
        .includes(operation.toLowerCase())
    ) {
      return setValidation(t('validations.operation_exists'));
    }

    // Validate if the entered operation title is to long
    if (operation.length > 20) {
      return setValidation(t('validations.operation_text_too_long'));
    }

    // Validate if the entered sentence contains words longer than 10 characters
    if (operation.split(' ').some((word) => word.length > 10)) {
      return setValidation(t('validations.operation_word_too_long'));
    }

    updateDocument(currentUser.id, data);
    setOperation('');
    setValidation('');
  };

  // Clearing the input field and also resetting the validation text
  const handleClear = () => {
    setOperation('');
    setValidation('');
  };

  return (
    <>
      <Form style={{ width: '100%' }} onSubmit={handleAddOperation}>
        <Input
          name="operation"
          value={operation}
          onChange={(e) => setOperation(e.target.value)}
          label={t('input.label.operation')}
          placeholder={t('input.placeholder.operation')}
          handleClear={handleClear}
          clearable
          required
        />
        <Button block icon={<AddIcon color={tokens.colors.fff} />}>
          {t('settings.add_operation')}
        </Button>
      </Form>

      <ValidationTextWrapper>
        {validation && <ValidationText noMargin>{validation}</ValidationText>}
      </ValidationTextWrapper>
    </>
  );
};

// styled components
const ValidationTextWrapper = styled.div`
  width: 100%;
`;

export default OperationForm;

// Prop types
OperationForm.propTypes = {
  user: PropTypes.array.isRequired,
};
