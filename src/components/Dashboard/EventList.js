import React, { useState } from 'react';
import styled from 'styled-components';
import { useTranslation } from 'react-i18next';
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
import Error from '../UI/Error';

const EventList = ({ events, error, selectedDate }) => {
  const [showAdd, setShowAdd] = useState(false);
  const [showPay, setShowPay] = useState(false);
  const [selected, setSelected] = useState(0);

  const { t } = useTranslation();

  // Check if the date is after or the same as current day
  const checkDate =
    selectedDate.isSameOrAfter(moment()) ||
    selectedDate.format('YY-MM-DD') === moment().format('YY-MM-DD');

  if (!events) {
    return null;
  }

  const nextEvent = events.find(
    (event) =>
      moment(event.date.seconds * 1000).format('YY-MM-DD HH:mm') >
        moment().format('YY-MM-DD HH:mm') &&
      moment(event.date.seconds * 1000).isSame(moment(), 'day')
  );

  return (
    <EventListWrapper>
      <AddEvent>
        <Text tag="h2" variant="h2" color={tokens.colors.primaryDark3}>
          {t('dashboard.appointments')}
        </Text>
        {checkDate && (
          <Button
            onClick={() => setShowAdd(!showAdd)}
            icon={<AddIcon color="#fff" />}
          >
            {t('dashboard.new')}
          </Button>
        )}

        {error && <Error>{error}</Error>}
      </AddEvent>

      <EventWrapper>
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
                  next={nextEvent}
                />
              ))}
          </>
        ) : (
          <FlexCenter>
            <Text variant="regular14" color={tokens.colors.primaryLight3}>
              {t('warning.no_appointments')}
            </Text>
          </FlexCenter>
        )}
      </EventWrapper>

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

const EventWrapper = styled.div``;

const AddEvent = styled.div`
  width: 100%;
  padding: 0 10px 20px 20px;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

export default EventList;
