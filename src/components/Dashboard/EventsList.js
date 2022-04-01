import React, { useState } from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import styled from 'styled-components';
import { timestamps } from '../../utils/timestamps';
import { useLocalStorage } from '../../hooks/useLocalStorage';

// Project imports
import Event from './Event';
import ModalAdd from './ModalAddEvent';
import ModalPay from './ModalPay';
import Placeholder from './Placeholder';
import EventsTitle from './EventsTitle';
import { motion } from 'framer-motion';

const EventsList = ({ events, error, selectedDate }) => {
  const [showAdd, setShowAdd] = useState(false);
  const [showPay, setShowPay] = useState(false);
  const [selected, setSelected] = useState(0);
  const [time, setTime] = useState('12:00');

  // state responsible for the rendered view
  const [active, setActive] = useLocalStorage('Type', 'working-hours');
  const [workingHours, setWorkingHours] = useLocalStorage('Hours', [16, 37]);

  // Creating array which holds a string timestamp or moment object if exists
  const dailyData =
    events &&
    timestamps.map(
      (timestamp) =>
        events.find(
          (match) =>
            moment(match.date.seconds * 1000).format('HH:mm') === timestamp
        ) || timestamp
    );

  // Function to return if a number is odd or not
  const isOdd = (number) => {
    return number % 2 !== 0;
  };

  if (!events) {
    return null;
  }

  return (
    <>
      <EventsTitle
        data={dailyData}
        error={error}
        active={active}
        setActive={setActive}
        setWorkingHours={setWorkingHours}
        setShowAdd={setShowAdd}
      />

      <>
        {dailyData.slice(workingHours[0], workingHours[1]).map((event, i) => (
          <div key={i}>
            <motion.div
              initial={{ translateX: -50, opacity: 0 }}
              animate={{ translateX: 0, opacity: 1 }}
              exit={{ translateX: 10, opacity: 0 }}
              transition={{ duration: 0.25, delay: i * 0.1 }}
            >
              {typeof event !== 'string' ? (
                <Event
                  event={event}
                  setSelected={setSelected}
                  setShowPay={setShowPay}
                />
              ) : (
                <Placeholder
                  filtered={active !== 'filtered'}
                  event={event}
                  setTime={setTime}
                  setShowAdd={setShowAdd}
                  selectedDate={selectedDate}
                />
              )}
            </motion.div>

            {isOdd(i) && active !== 'filtered' && <Divider />}
          </div>
        ))}
      </>

      <ModalAdd
        show={showAdd}
        setShow={setShowAdd}
        time={time}
        setTime={setTime}
        selectedDate={selectedDate}
        setSelected
      />
      <ModalPay show={showPay} setShow={setShowPay} selected={selected} />
    </>
  );
};

// Styled components
const Divider = styled.div`
  height: 20px;
`;

export default EventsList;

// Prop types
EventsList.propTypes = {
  error: PropTypes.string,
  events: PropTypes.array,
  selectedDate: PropTypes.oneOfType([
    PropTypes.object,
    PropTypes.string,
    PropTypes.number,
  ]),
};
