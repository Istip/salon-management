import React from 'react';

// project components
import Event from './Event';

const EventList = ({ events }) => {
  console.log(events);

  if (!events) {
    return null;
  }

  return (
    <>
      {events
        .sort((a, b) => a.date.seconds - b.date.seconds)
        .map((event) => (
          <Event key={event.id} event={event} />
        ))}
    </>
  );
};

export default EventList;
