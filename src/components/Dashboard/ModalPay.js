import React, { useEffect, useState } from 'react';
import { useFirestore } from '../../hooks/useFirestore';
import { useTranslation } from 'react-i18next';
import { tokens } from '../UI/tokens';

// project components
import Form from '../UI/Form';
import Modal from '../UI/Modal';
import Input from '../UI/Input';
import MoneyIcon from '../icons/MoneyIcon';
import ValidationText from '../UI/ValidationText';

const ModalPay = ({ show, setShow, selected }) => {
  const [price, setPrice] = useState('');
  const [validation, setValidation] = useState('');

  const { updateDocument } = useFirestore('events');

  const { t } = useTranslation();

  const handleSubmit = (e) => {
    e.preventDefault();

    // Validate if the entered price is lower than zero or omitted
    if (price === '' || price < 0) {
      return setValidation(t('validations.enter_price'));
    }

    updateDocument(selected.id, { ...selected, price });
    setPrice('');
    setValidation('');
    setShow(false);
  };

  // Function fired when we cancel the form
  const handleCancel = () => {
    setPrice('');
    setValidation('');
    setShow(false);
  };

  useEffect(() => {
    setPrice('');
    // eslint-disable-next-line
  }, [selected]);

  const iconProps = {
    color: tokens.colors.primaryLight1,
  };

  return (
    <Modal
      show={show}
      setShow={setShow}
      title={t('dashboard.modal_title')}
      onSubmit={handleSubmit}
      onCancel={handleCancel}
    >
      <Form style={{ padding: '20px 20px 0' }}>
        <Input
          type="number"
          label={t('input.label.payed')}
          placeholder={t('input.placeholder.payed')}
          name="name"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
          icon={<MoneyIcon {...iconProps} />}
          autoComplete="off"
        />
      </Form>

      {validation && <ValidationText>{validation}</ValidationText>}
    </Modal>
  );
};

export default ModalPay;
