import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import moment from 'moment';
import { tokens } from '../UI/tokens';
import { timestamp } from '../../firebase/config';
import { useFirestore } from '../../hooks/useFirestore';
import { useAuthContext } from '../../hooks/useAuthContext';

// project components
import Form from '../UI/Form';
import Modal from '../UI/Modal';
import Input from '../UI/Input';
import Text from '../UI/Text';
import UserUserIcon from '../icons/UserIcon';
import TimeIcon from '../icons/TimeIcon';

const ModalAddEvent = ({ show, setShow, selectedDate }) => {
  const [name, setName] = useState('');
  const [action, setAction] = useState('haircut');
  const [gender, setGender] = useState('female');
  const [date, setDate] = useState(moment().format('HH:mm'));

  const actions = ['haircut', 'hairdye', 'manicure', 'pedicure', 'other'];

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
      // TODO: fix console warning for the incorrect format
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
      title="New Appointment"
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
          type="time"
          label="Select time"
          placeholder="Enter client name..."
          name="meeting-time"
          value={date}
          onChange={(e) => setDate(e.target.value)}
          icon={<TimeIcon {...iconProps} />}
        />

        <BadgeWrapper>
          {actions.map((item) => (
            <TypeBadge
              key={item}
              className={item === action ? 'active' : ''}
              onClick={() => setAction(item)}
            >
              <Text
                variant="medium8"
                color={item === action ? '#fff' : tokens.colors.primary}
              >
                {item}
              </Text>
            </TypeBadge>
          ))}
        </BadgeWrapper>

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
  padding: 20px 0 10px;
`;

const BadgeWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 5px;
`;

const TypeBadge = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
  min-width: 48px;
  max-width: 48px;
  height: 48px;
  padding: 4px;
  background: ${tokens.colors.primaryLight4};
  border: 1px solid ${tokens.colors.primary};
  border-radius: 10px;
  cursor: pointer;
  transition: 250ms ease;

  &.active {
    background: ${primary};
    border: 1px solid ${primary};
  }
`;

export default ModalAddEvent;
