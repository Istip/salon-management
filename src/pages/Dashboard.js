import React from 'react';
import styled from 'styled-components';
import ClientList from '../components/Dashboard/ClientList';

const Dashboard = () => {
  return (
    <DashboardWrapper>
      <h1>Today</h1>
      <ClientList />
    </DashboardWrapper>
  );
};

// styled components
const DashboardWrapper = styled.div`
  margin: 20px;
`;

export default Dashboard;
