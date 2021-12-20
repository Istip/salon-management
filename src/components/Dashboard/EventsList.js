import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import { timestamps } from '../../utils/timestamps';
import { useLocalStorage } from '../../hooks/useLocalStorage';

// project components
import Event from './Event';
import ModalAdd from './ModalAddEvent';
import ModalPay from './ModalPay';
import Placeholder from './Placeholder';
import CurrentTime from '../UI/CurrentTime';
import EventsTitle from './EventsTitle';

const EventsList = ({ events, error, selectedDate }) => {
  const [showAdd, setShowAdd] = useState(false);
  const [showPay, setShowPay] = useState(false);
  const [selected, setSelected] = useState(0);
  const [time, setTime] = useState('');
  const [currentTime, setCurrentTime] = useState(moment());

  // state responsible for the rendered view
  const [active, setActive] = useLocalStorage('Type', 'working-hours');
  const [workingHours, setWorkingHours] = useLocalStorage('Hours', [16, 37]);

  // Constant returning the mix of two arrays: imported timestamps which holds the daily
  // calendar timestamps if the timestamp has match with an event, it replaces the timestamp
  // and holds the data of the event instead
  const dailyData =
    events &&
    timestamps.map(
      (obj) =>
        events.find(
          (o) => moment(o.date.seconds * 1000).format('HH:mm') === obj
        ) || obj
    );

  // Function returning the time, time difference and if event is after current time
  const getTimeData = (event) => {
    const time =
      typeof event === 'string'
        ? moment(selectedDate).set({
            hour: event.slice(0, 2),
            minute: event.slice(3, 5),
          })
        : moment(event.date.seconds * 1000);

    const after = moment(time).isAfter(moment());
    const diff = moment().diff(time, 'minutes');

    return { time, after, diff };
  };

  // Function returns true if the event is the next in the timeline
  const isNextEvent = (event) => {
    return (
      getTimeData(event).after &&
      getTimeData(event).diff >= -30 &&
      getTimeData(event).time.isSame(moment(), 'day')
    );
  };

  // Side effect for clock ticking
  useEffect(() => {
    const intervalID = setTimeout(() => {
      setCurrentTime(moment());
    }, 1000);

    return () => clearInterval(intervalID);
  }, [currentTime]);

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
      />

      <div>
        {dailyData.slice(workingHours[0], workingHours[1]).map((event, i) => (
          <div key={i}>
            <div>
              {isNextEvent(event) && <CurrentTime time={currentTime} />}
            </div>

            <div>
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
            </div>
          </div>
        ))}
      </div>

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
