import React, { useEffect, useState } from 'react';
import { tokens } from '../UI/tokens';
import { useFirestore } from '../../hooks/useFirestore';

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

  const handleSubmit = (e) => {
    e.preventDefault();

    if (price === '') {
      setValidation('Please enter the price!');
      return null;
    }

    updateDocument(selected.id, { ...selected, price });
    setPrice('');
    setValidation('');
    setShow(false);
  };

  const handleCancel = () => {
    setPrice('');
    setValidation('');
    setShow(false);
  };

  const iconProps = {
    color: tokens.colors.primaryLight1,
  };

  useEffect(() => {
    setPrice('');
    // eslint-disable-next-line
  }, [selected]);

  return (
    <Modal
      show={show}
      setShow={setShow}
      title="Add Payment"
      onSubmit={handleSubmit}
      onCancel={handleCancel}
    >
      <Form style={{ padding: '20px 20px 0' }}>
        <Input
          type="number"
          min={0}
          label={`${selected.name ? selected.name : 'The client'} payed`}
          placeholder="Introduce the price..."
          name="name"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
          icon={<MoneyIcon {...iconProps} />}
        />
      </Form>

      {validation && <ValidationText>{validation}</ValidationText>}
    </Modal>
  );
};

// styled components

export default ModalPay;
