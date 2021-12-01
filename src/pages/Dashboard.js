import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import moment from 'moment';
import { useCollection } from '../hooks/useCollection';

// project components
import Calendar from '../components/Dashboard/Calendar';
import EventList from '../components/Dashboard/EventList';

const Dashboard = () => {
  const [selectedDate, setSelectedDate] = useState(moment());

  let startOfDay = moment(selectedDate).toDate();
  startOfDay.setHours(0, 0, 0, 0);
  let endOfDay = moment(selectedDate).toDate();
  endOfDay.setHours(23, 59, 59, 999);

  const { documents, error } = useCollection(
    'events',
    ['date', '>', startOfDay],
    ['date', '<', endOfDay]
  );

  const events = documents;

  useEffect(() => {
    setSelectedDate(setSelectedDate);
  }, [selectedDate]);

  return (
    <DashboardWrapper>
      {error && error}
      <Calendar selectedDate={selectedDate} setSelectedDate={setSelectedDate} />
      <EventList events={events} error={error} />
    </DashboardWrapper>
  );
};

// styled components
const DashboardWrapper = styled.div`
  margin: 60px 0 80px;
`;

export default Dashboard;
