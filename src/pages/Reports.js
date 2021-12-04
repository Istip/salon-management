import React from 'react';
import styled from 'styled-components';

// project components
import Users from '../components/Reports/Users';
import Income from '../components/Reports/Income';

const Reports = () => {
  return (
    <ReportsWrapper>
      <ElementWrapper>
        <Income />
        <Users />
      </ElementWrapper>
    </ReportsWrapper>
  );
};

// styled components
const ReportsWrapper = styled.div`
  margin: 80px 0 80px;
`;

const ElementWrapper = styled.div`
  padding: 10px;
`;

export default Reports;
