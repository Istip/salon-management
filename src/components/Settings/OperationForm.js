import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useFirestore } from '../../hooks/useFirestore';

// project components
import Form from '../UI/Form';
import Input from '../UI/Input';
import Button from '../UI/Button';
import AddIcon from '../icons/AddIcon';

const OperationForm = ({ user }) => {
  const [operation, setOperation] = useState('');

  const { updateDocument } = useFirestore('clients');

  const { t } = useTranslation();

  const handleAddOperation = (e) => {
    e.preventDefault();

    const userId = user[0].id;

    const userActions = user[0].actions;

    // TODO: fix this crap because it doesn't work but still no error 😡😡😡
    updateDocument(userId, {
      ...user[0],
      actions: [...userActions, operation],
    });
    setOperation('');
  };

  return (
    <Form style={{ width: '100%' }} onSubmit={handleAddOperation}>
      <Input
        name="operation"
        value={operation}
        onChange={(e) => setOperation(e.target.value)}
        label={t('input.label.operation')}
        placeholder={t('input.placeholder.operation')}
        handleClear={() => setOperation('')}
        clearable
        required
      />
      <Button block icon={<AddIcon color="#fff" />}>
        {t('settings.add_operation')}
      </Button>
    </Form>
  );
};

export default OperationForm;
