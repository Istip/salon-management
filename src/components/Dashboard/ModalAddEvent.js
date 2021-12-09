import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import moment from 'moment';
import { useTranslation } from 'react-i18next';
import { useFirestore } from '../../hooks/useFirestore';
import { useAuthContext } from '../../hooks/useAuthContext';
import { tokens } from '../UI/tokens';
import { timestamp } from '../../firebase/config';

// project components
import Form from '../UI/Form';
import Modal from '../UI/Modal';
import Input from '../UI/Input';
import Text from '../UI/Text';
import UserUserIcon from '../icons/UserIcon';
import TimeIcon from '../icons/TimeIcon';
import Select from '../UI/Select';

const ModalAddEvent = ({ show, setShow, selectedDate }) => {
  const [name, setName] = useState('');
  const [action, setAction] = useState('haircut');
  const [gender, setGender] = useState('female');
  const [date, setDate] = useState(moment().format('HH:mm'));

  const actions = ['haircut', 'hairdye', 'manicure', 'pedicure', 'other'];

  const { t } = useTranslation();

  const { user } = useAuthContext();

  const { addDocument, response } = useFirestore('events');

  const resetFields = () => {
    // Resetting the local state back to original
    setShow(false);
    setAction('haircut');
    setName('');
    setGender('female');
    setDate(moment().format('HH:mm'));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    addDocument({
      name,
      action,
      gender,
      finished: false,
      price: 0,
      date: timestamp.fromDate(
        moment(selectedDate)
          .set({ hour: date.slice(0, 2), minute: date.slice(3, 5) })
          .toDate()
      ),
      uid: user.uid,
    });

    resetFields();
  };

  const handleCancel = () => {
    resetFields();
  };

  useEffect(() => {
    if (response.success) {
      resetFields();
    }
    // eslint-disable-next-line
  }, [response.success]);

  useEffect(() => {
    setDate(moment().format('HH:mm'));
    // eslint-disable-next-line
  }, [show]);

  const iconProps = {
    color: tokens.colors.primaryLight1,
  };

  return (
    <Modal
      show={show}
      setShow={setShow}
      title={t('dashboard.new_appointment')}
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
          type="time"
          label={t('input.label.time')}
          name="meeting-time"
          value={date}
          onChange={(e) => setDate(e.target.value)}
          icon={<TimeIcon {...iconProps} />}
        />

        <Select
          label={t('input.label.event_type')}
          action={action}
          setAction={setAction}
          actions={actions}
        />

        <GenderWrapper>
          <GenderType>
            <Text
              variant={gender === 'female' ? 'black12' : 'regular12'}
              color={gender === 'female' ? primary : grey}
              onClick={() => setGender('female')}
            >
              {t('dashboard.female').toUpperCase()}
            </Text>
          </GenderType>

          <GenderType>
            <Text
              variant={gender === 'male' ? 'black12' : 'regular12'}
              color={gender === 'male' ? primary : grey}
              onClick={() => setGender('male')}
            >
              {t('dashboard.male').toUpperCase()}
            </Text>
          </GenderType>
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
  padding: 20px 0 10px;
`;

const GenderType = styled.div`
  cursor: pointer;

  &:first-child {
    padding-left: 20px;
  }

  &:last-child {
    padding-right: 20px;
  }
`;

export default ModalAddEvent;
