import React, { useState } from 'react';
import styled from 'styled-components';

// project components
import Form from '../UI/Form';
import Modal from '../UI/Modal';
import Input from '../UI/Input';
import Text from '../UI/Text';
import { tokens } from '../UI/tokens';

const ModalAddClient = ({ show, setShow, title, onCancel, onSubmit }) => {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [gender, setGender] = useState('female');

  return (
    <Modal
      show={show}
      setShow={setShow}
      title={title}
      onCancel={onCancel}
      onSubmit={onSubmit}
    >
      <Form style={{ padding: '20px 20px 0' }}>
        <Input
          type="text"
          label="Client Name"
          placeholder="Enter client name..."
          name="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />

        <Input
          type="number"
          label="Phone number"
          placeholder="Enter client phone number..."
          name="phone"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          style={{ marginBottom: '0' }}
        />

        <GenderWrapper>
          <Text
            variant={gender === 'female' ? 'black12' : 'regular12'}
            color={gender === 'female' ? primary : grey}
            onClick={() => setGender('female')}
          >
            FEMALE
          </Text>
          <Text
            variant={gender === 'male' ? 'black12' : 'regular12'}
            color={gender === 'male' ? primary : grey}
            onClick={() => setGender('male')}
          >
            MALE
          </Text>
        </GenderWrapper>
      </Form>
    </Modal>
  );
};

const primary = tokens.colors.primaryDark1;
const grey = tokens.colors.mediumGrey;

// styled components
const GenderWrapper = styled.div`
  display: flex;
  justify-content: center;
  gap: 10px;
  cursor: pointer;
  padding: 10px 0;
`;

export default ModalAddClient;
