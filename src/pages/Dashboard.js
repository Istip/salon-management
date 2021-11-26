import React from 'react';
import styled from 'styled-components';
import Calendar from '../components/Dashboard/Calendar';
import ClientList from '../components/Dashboard/ClientList';

const Dashboard = () => {
  return (
    <DashboardWrapper>
      <Calendar />
      <ClientList />
    </DashboardWrapper>
  );
};

// styled components
const DashboardWrapper = styled.div`
  margin: 60px 0 80px;
`;

export default Dashboard;
