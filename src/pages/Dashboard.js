import React from 'react';
import styled from 'styled-components';
import { useCollection } from '../hooks/useCollection';

// project components
import Calendar from '../components/Dashboard/Calendar';
import EventList from '../components/Dashboard/EventList';

const Dashboard = () => {
  const { documents, error } = useCollection('events');

  const events = documents;

  return (
    <DashboardWrapper>
      {error && error}
      <Calendar />
      <EventList events={events} error={error} />
    </DashboardWrapper>
  );
};

// styled components
const DashboardWrapper = styled.div`
  margin: 60px 0 80px;
`;

export default Dashboard;
