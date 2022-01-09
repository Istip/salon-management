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
import Slider from '../UI/Slider';

const ModalAddEvent = ({ show, setShow, selectedDate, time, setTime }) => {
  const [name, setName] = useState('');
  const [action, setAction] = useState('');
  const [gender, setGender] = useState('female');
  const [late, setLate] = useState(0);

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
    setLate(0);
  };

  // Function fired when submitting the modal
  const handleSubmit = (e) => {
    e.preventDefault();

    // Object that gonna be published to server
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
      late,
    });

    resetFields();
  };

  // Reset input fields on form cancellation
  const handleCancel = () => {
    resetFields();
  };

  // Function to change the time and the minutes
  const changeTime = (type = 'hour') => {
    const hour = time.slice(0, 2);
    const minute = time.slice(3, 5);
    const parsedHour = parseInt(hour);

    if (type === 'hour') {
      if (parsedHour + 1 < 10) {
        const newTime = `0${parseInt(time.slice(0, 2)) + 1}:${minute}`;
        return setTime(newTime);
      }

      if (parsedHour + 1 >= 10 && parsedHour + 1 < 24) {
        const newTime = `${parseInt(time.slice(0, 2)) + 1}:${minute}`;
        return setTime(newTime);
      }

      const newTime = `00:${minute}`;
      return setTime(newTime);
    }

    if (type === 'minute') {
      if (minute === '00') {
        return setTime(`${hour}:30`);
      }

      return setTime(`${hour}:00`);
    }
  };

  // Function to display the minutes with the late added
  const formattedMinutes = () => {
    const minutes = parseInt(late) + parseInt(time.slice(3, 5));
    if (minutes < 10) {
      return `0${minutes}`;
    }
    return minutes;
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
        <TimeWrapper>
          <Text variant="display" color={tokens.colors.success} tag="h1">
            <span onClick={() => changeTime()}>{time.slice(0, 2)}:</span>
            <span onClick={() => changeTime('minute')}>
              {formattedMinutes()}
            </span>
          </Text>
        </TimeWrapper>
      </FlexCenter>

      <FlexCenter
        style={{
          gap: '10px',
          padding: '20px 20px 0 20px',
        }}
      >
        <Slider
          label={`${t('dashboard.late')}: ${late} ${t('dashboard.minutes')}`}
          value={late}
          min={0}
          max={29}
          onChange={(e) => setLate(e.target.value)}
        />
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
              variant={gender === 'female' ? 'black18' : 'regular18'}
              color={gender === 'female' ? primary : grey}
            >
              {t('dashboard.female').toUpperCase()}
            </Text>
          </GenderType>

          <GenderType onClick={() => setGender('male')}>
            <Text
              variant={gender === 'male' ? 'black18' : 'regular18'}
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

const TimeWrapper = styled.span`
  font-feature-settings: 'tnum' on, 'lnum' on;
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
