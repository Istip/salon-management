import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { useTranslation } from 'react-i18next';
import { useFirestore } from '../../hooks/useFirestore';
import { useAuthContext } from '../../hooks/useAuthContext';
import { tokens } from '../UI/tokens';

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

  const { t } = useTranslation();

  // Function fired when we submit the form
  const handleSubmit = (e) => {
    e.preventDefault();

    // Validating if name or phone number was provided
    if (name === '' || phone === '') {
      setValidation(t('validations.client_name_and_phone'));
      return null;
    }

    // Validating if the phone number has 10 numbers
    if (name !== '' && phone.length < 10) {
      setValidation(t('validations.valid_phone_number'));
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

  // Reset the fields to default when cancelling the form
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
      title={t('client.modal_title')}
      onSubmit={handleSubmit}
      onCancel={handleCancel}
    >
      <Form style={{ padding: '20px 20px 0' }}>
        <Input
          type="text"
          label={t('input.label.client_name')}
          placeholder={t('input.placeholder.client_name')}
          name="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          icon={<UserUserIcon {...iconProps} />}
          autoComplete="off"
        />

        <Input
          type="number"
          label={t('input.label.phone_number')}
          placeholder={t('input.placeholder.phone_number')}
          name="phone"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          style={{ marginBottom: '0' }}
          icon={<PhoneIcon {...iconProps} />}
          autoComplete="off"
          min={0}
        />

        <GenderWrapper>
          <Text
            variant={gender === 'female' ? 'black12' : 'regular12'}
            color={gender === 'female' ? primary : grey}
            onClick={() => setGender('female')}
          >
            {t('client.female').toUpperCase()}
          </Text>
          <Text
            variant={gender === 'male' ? 'black12' : 'regular12'}
            color={gender === 'male' ? primary : grey}
            onClick={() => setGender('male')}
          >
            {t('client.male').toUpperCase()}
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

// Prop types
ModalAddClient.propTypes = {
  setShow: PropTypes.func.isRequired,
  show: PropTypes.bool.isRequired,
};
