import React, { useState } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import moment from 'moment';
import { timestamps } from '../../utils/timestamps';
import { useTranslation } from 'react-i18next';
import { tokens } from '../UI/tokens';

// project components
import Event from './Event';
import ModalAdd from './ModalAddEvent';
import ModalPay from './ModalPay';
import Error from '../UI/Error';
import Placeholder from './Placeholder';
import Text from '../UI/Text';
import FlexCenter from '../UI/FlexCenter';
import TimeIcon from '../icons/TimeIcon';
import ViewAllIcon from '../icons/ViewAllIcon';
import CalendarIcon from '../icons/CalendarIcon';

const EventList = ({ events, error, selectedDate }) => {
  const [showAdd, setShowAdd] = useState(false);
  const [showPay, setShowPay] = useState(false);
  const [selected, setSelected] = useState(0);
  const [time, setTime] = useState('');

  // state responsible for the rendered view
  const [active, setActive] = useState('working-hours');
  const [workingHours, setWorkingHours] = useState([16, 37]);

  const { t } = useTranslation();

  // Function returning if the passed number is odd or not
  const isOdd = (number) => {
    return number % 2;
  };

  // Filter button selecting
  const viewAll = () => {
    if (active !== 'all') {
      setActive('all');
      setWorkingHours([0, 48]);
    }
  };

  const viewFiltered = () => {
    if (active !== 'filtered') {
      setActive('filtered');
      setWorkingHours([0, 48]);
    }
  };

  const viewWorkingHours = () => {
    if (active !== 'working-hours') {
      setActive('working-hours');
      setWorkingHours([16, 37]);
    }
  };

  if (!events) {
    return null;
  }

  // Constant returning the mix of two arrays:
  // ... imported timestamps which holds the daily calendar timestamps
  // ... if the timestamp has match with an event, it replaces the timestamp
  // ... and holds the data of the event instead
  const dailyData =
    events &&
    timestamps.map(
      (obj) =>
        events.find(
          (o) => moment(o.date.seconds * 1000).format('HH:mm') === obj
        ) || obj
    );

  // Return the number of daily clients
  const clientsForDay = dailyData
    .filter((client) => typeof client !== 'string')
    .map((client) => client.finished);

  // Filtering out which event is the next for the actual day
  const nextEvent = events.find(
    (event) =>
      moment(event.date.seconds * 1000).format('YY-MM-DD HH:mm') >
        moment().format('YY-MM-DD HH:mm') &&
      moment(event.date.seconds * 1000).isSame(moment(), 'day')
  );

  return (
    <>
      <HeadBar>
        <Title>
          {!!clientsForDay.length && (
            <ClientsBadge
              finished={clientsForDay.every((item) => item === true)}
            >
              <Text variant="regular8" color={tokens.colors.fff}>
                {clientsForDay.length}
              </Text>
            </ClientsBadge>
          )}
          <Text tag="h2" variant="h2" color={tokens.colors.primaryDark3}>
            {t('dashboard.appointments')}
          </Text>
        </Title>

        <FilterMenu>
          <FlexCenter style={{ gap: '5px' }}>
            <FilterItem active={active === 'all'} onClick={() => viewAll()}>
              <FlexCenter>
                <CalendarIcon color={tokens.colors.primaryDark3} />
              </FlexCenter>
            </FilterItem>

            <FilterItem
              active={active === 'filtered'}
              onClick={() => viewFiltered()}
            >
              <FlexCenter>
                <ViewAllIcon color={tokens.colors.primaryDark3} />
              </FlexCenter>
            </FilterItem>

            <FilterItem
              active={active === 'working-hours'}
              onClick={() => viewWorkingHours()}
            >
              <FlexCenter>
                <TimeIcon color={tokens.colors.primaryDark3} />
              </FlexCenter>
            </FilterItem>
          </FlexCenter>
        </FilterMenu>

        {error && <Error>{error}</Error>}
      </HeadBar>

      {dailyData.slice(workingHours[0], workingHours[1]).map((event, i) => {
        return (
          <EventItem key={i}>
            {typeof event !== 'string' ? (
              <Event
                event={event}
                setSelected={setSelected}
                setShowPay={setShowPay}
                next={nextEvent}
              />
            ) : (
              <>
                {active !== 'filtered' && (
                  <Placeholder
                    event={event}
                    setTime={setTime}
                    setShowAdd={setShowAdd}
                  />
                )}
              </>
            )}
            {isOdd(i) && active !== 'filtered' ? <Divider /> : null}
          </EventItem>
        );
      })}

      <ModalAdd
        show={showAdd}
        setShow={setShowAdd}
        time={time}
        selectedDate={selectedDate}
        setSelected
      />
      <ModalPay show={showPay} setShow={setShowPay} selected={selected} />
    </>
  );
};

// styled components
const EventItem = styled.div``;

const Divider = styled.div`
  width: 100%;
  height: 10px;
`;

const HeadBar = styled.div`
  width: 100%;
  padding: 0 10px 20px 20px;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const FilterMenu = styled.div`
  position: relative;
  display: flex;
  align-items: flex-end;
  justify-content: center;
  flex-direction: column;
  gap: 5px;
  background: ${tokens.colors.primaryLight4};
  border-radius: 4px;
  border: 1px solid ${tokens.colors.primaryLight3};
  display: flex;
  align-items: center;
  justify-content: center;

  padding: 6px;
  gap: 6px;
`;

const ClientsBadge = styled.div`
  position: absolute;
  right: -16px;
  top: -8px;
  border-radius: 20px;
  width: 16px;
  height: 16px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: ${(props) =>
    props.finished ? `${tokens.colors.success}` : `${tokens.colors.warning}`};
  border: ${(props) =>
    props.finished
      ? `1px solid ${tokens.colors.success}`
      : `1px solid ${tokens.colors.warning}`};
  transition: 250ms ease;

  &:hover {
    transform: scale(2);
  }
`;

const FilterItem = styled.span`
  position: relative;
  background: ${(props) =>
    props.active
      ? `${tokens.colors.primaryLight3}`
      : `${tokens.colors.primaryLight4}`};
  padding: 6px;
  border-radius: 4px;
  cursor: pointer;
  transition: 250ms ease;

  &:hover {
    background: ${tokens.colors.primaryLight3};
  }
`;

const Title = styled.div`
  position: relative;
`;

export default EventList;

// Prop types
EventList.propTypes = {
  error: PropTypes.string,
  events: PropTypes.array,
  selectedDate: PropTypes.oneOfType([
    PropTypes.object,
    PropTypes.string,
    PropTypes.number,
  ]),
};
