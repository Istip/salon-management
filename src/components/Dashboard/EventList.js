import React, { useState } from 'react';
import styled from 'styled-components';
import { tokens } from '../UI/tokens';

// project components
import Event from './Event';
import ModalAdd from './ModalAddEvent';
import Text from '../UI/Text';
import Button from '../UI/Button';
import AddIcon from '../icons/AddIcon';
import FlexCenter from '../UI/FlexCenter';
import ModalPay from './ModalPay';
import moment from 'moment';

const EventList = ({ events, error, selectedDate }) => {
  const [showAdd, setShowAdd] = useState(false);
  const [showPay, setShowPay] = useState(false);
  const [selected, setSelected] = useState(0);

  if (!events) {
    return null;
  }

  return (
    <EventListWrapper>
      <AddEvent>
        <Text tag="h2" variant="h2" color={tokens.colors.primaryDark3}>
          Appointments
        </Text>
        {(selectedDate.isSameOrAfter(moment()) ||
          selectedDate.format('YY-MM-DD') === moment().format('YY-MM-DD')) && (
          <Button
            onClick={() => setShowAdd(!showAdd)}
            icon={<AddIcon color="#fff" rounded />}
            rounded
          />
        )}

        {error && error}
      </AddEvent>

      {events.length ? (
        <>
          {events
            .sort((a, b) => a.date.seconds - b.date.seconds)
            .map((event) => (
              <Event
                key={event.id}
                event={event}
                setSelected={setSelected}
                setShowPay={setShowPay}
              />
            ))}
        </>
      ) : (
        <FlexCenter>
          <Text variant="regular14" color={tokens.colors.primaryLight3}>
            You have no appointment for this day...
          </Text>
        </FlexCenter>
      )}

      {/* Da' modalz used in dis' compo' */}
      <ModalAdd
        show={showAdd}
        setShow={setShowAdd}
        selectedDate={selectedDate}
        setSelected
      />
      <ModalPay show={showPay} setShow={setShowPay} selected={selected} />
    </EventListWrapper>
  );
};

// styled components
const EventListWrapper = styled.div``;

const AddEvent = styled.div`
  width: 100%;
  padding: 0 20px 10px;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

export default EventList;
