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
import UserUserIcon from '../icons/UserIcon';
import PhoneIcon from '../icons/PhoneIcon';
import ValidationText from '../UI/ValidationText';

const ModalAddClient = ({ show, setShow }) => {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [gender, setGender] = useState('female');

  const [validation, setValidation] = useState('');

  const { user } = useAuthContext();

  const { addDocument, response } = useFirestore('clients');

  const handleSubmit = (e) => {
    e.preventDefault();

    if (name === '' || phone === '') {
      setValidation('Please enter client name and phone!');
      return null;
    }

    if (name !== '' && phone.length < 10) {
      setValidation('Please enter valid phone number!');
      return null;
    }

    addDocument({
      name,
      phone,
      gender,
      elite: false,
      visits: [],
      uid: user.uid,
    });

    setValidation('');
    setShow(false);
  };

  const handleCancel = () => {
    setShow(false);
    setValidation('');
    setName('');
    setPhone('');
    setGender('female');
  };

  useEffect(() => {
    if (response.success) {
      setValidation('');
      setName('');
      setPhone('');
      setGender('female');
    }
  }, [response.success]);

  const iconProps = {
    color: tokens.colors.primaryLight1,
  };

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
          icon={<UserUserIcon {...iconProps} />}
          autoComplete="off"
        />

        <Input
          type="number"
          label="Phone number"
          placeholder="Enter client phone number..."
          name="phone"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          style={{ marginBottom: '0' }}
          icon={<PhoneIcon {...iconProps} />}
          autoComplete="off"
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

      {validation && <ValidationText>{validation}</ValidationText>}
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
