import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import moment from 'moment';
import { useTranslation } from 'react-i18next';
import { useFirestore } from '../../hooks/useFirestore';
import { useAuthContext } from '../../hooks/useAuthContext';
import { useCollection } from '../../hooks/useCollection';
import { timestamp } from '../../firebase/config';
import { tokens } from '../UI/tokens';

// project components
import Form from '../UI/Form';
import Modal from '../UI/Modal';
import Input from '../UI/Input';
import Text from '../UI/Text';
import UserUserIcon from '../icons/UserIcon';
import EventIcon from '../icons/EventIcon';
import Select from '../UI/Select';
import FlexCenter from '../UI/FlexCenter';

const ModalAddEvent = ({ show, setShow, selectedDate, time }) => {
  const [name, setName] = useState('');
  const [action, setAction] = useState('');
  const [gender, setGender] = useState('female');

  const { documents } = useCollection('users');

  const { t } = useTranslation();

  const { user } = useAuthContext();

  const { addDocument, response } = useFirestore('events');

  // Resetting the local state back to original
  const resetFields = () => {
    setShow(false);
    setAction('');
    setName('');
    setGender('female');
  };

  // Function fired when submitting the modal
  const handleSubmit = (e) => {
    e.preventDefault();

    addDocument({
      name,
      action: action || t('dashboard.no_data'),
      gender,
      finished: false,
      price: 0,
      date: timestamp.fromDate(
        moment(selectedDate)
          .set({ hour: time.slice(0, 2), minute: time.slice(3, 5) })
          .toDate()
      ),
      uid: user.uid,
    });

    resetFields();
  };

  // Reset input fields on form cancellation
  const handleCancel = () => {
    resetFields();
  };

  useEffect(() => {
    if (response.success) {
      resetFields();
    }
    // eslint-disable-next-line
  }, [response.success]);

  const iconProps = {
    color: tokens.colors.primaryLight1,
  };

  if (!documents) {
    return null;
  }

  const actions = documents ? documents[0].actions : ['haircut'];

  return (
    <Modal
      show={show}
      setShow={setShow}
      title={t('dashboard.new_appointment')}
      onSubmit={handleSubmit}
      onCancel={handleCancel}
    >
      <FlexCenter style={{ marginTop: '20px', gap: '10px' }}>
        <Text color={tokens.colors.success} tag="h1">
          {time}
        </Text>
      </FlexCenter>

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

        <Select
          label={t('input.label.event_type')}
          selected={action}
          setSelected={setAction}
          list={actions.sort()}
          icon={<EventIcon color={tokens.colors.primaryLight1} />}
        />

        <GenderWrapper>
          <GenderType onClick={() => setGender('female')}>
            <Text
              variant={gender === 'female' ? 'black12' : 'regular12'}
              color={gender === 'female' ? primary : grey}
            >
              {t('dashboard.female').toUpperCase()}
            </Text>
          </GenderType>

          <GenderType onClick={() => setGender('male')}>
            <Text
              variant={gender === 'male' ? 'black12' : 'regular12'}
              color={gender === 'male' ? primary : grey}
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

// Prop types
ModalAddEvent.propTypes = {
  selectedDate: PropTypes.oneOfType([
    PropTypes.object,
    PropTypes.string,
    PropTypes.number,
  ]),
  setShow: PropTypes.func,
  show: PropTypes.bool,
  time: PropTypes.string.isRequired,
};
