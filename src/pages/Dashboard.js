import React, { useState } from 'react';
import styled from 'styled-components';
import moment from 'moment';
import { useCollection } from '../hooks/useCollection';

// project components
import Calendar from '../components/Dashboard/Calendar';
import EventList from '../components/Dashboard/EventList';

const Dashboard = () => {
  const [selectedDate, setSelectedDate] = useState(moment());

  const { documents, error } = useCollection('events');

  // Filter the incoming data for match the current day
  const filteredEvents =
    documents &&
    documents.filter(
      (doc) =>
        moment(doc.date.seconds * 1000).format('YY-MM-DD') ===
        moment(selectedDate).format('YY-MM-DD')
    );

  return (
    <DashboardWrapper>
      <Calendar selectedDate={selectedDate} setSelectedDate={setSelectedDate} />

      {error && error}

      <EventList
        events={filteredEvents}
        error={error}
        selectedDate={selectedDate}
        setSelectedDate={setSelectedDate}
      />
    </DashboardWrapper>
  );
};

// styled components
const DashboardWrapper = styled.div`
  margin: 60px 0 80px;
`;

export default Dashboard;
