import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { tokens } from '../UI/tokens';
import { useFirestore } from '../../hooks/useFirestore';
import { useAuthContext } from '../../hooks/useAuthContext';

// project components
import Form from '../UI/Form';
import Modal from '../UI/Modal';
import Input from '../UI/Input';
import Text from '../UI/Text';

const ModalAddClient = ({ show, setShow }) => {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [gender, setGender] = useState('female');

  const { user } = useAuthContext();

  const { addDocument, response } = useFirestore('clients');

  const handleSubmit = (e) => {
    e.preventDefault();
    addDocument({ name, phone, gender, elite: false, uid: user.uid });
    setShow(false);
  };

  const handleCancel = () => {
    setShow(false);
    setName('');
    setPhone('');
    setGender('female');
  };

  useEffect(() => {
    if (response.success) {
      setName('');
      setPhone('');
      setGender('female');
    }
  }, [response.success]);

  return (
    <Modal
      show={show}
      setShow={setShow}
      title="Add new Client"
      onSubmit={handleSubmit}
      onCancel={handleCancel}
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
          type="phone"
          maxlength="10"
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
