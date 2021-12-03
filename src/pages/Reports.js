import React from 'react';
import styled from 'styled-components';
import { tokens } from '../components/UI/tokens';

// project components
import Text from '../components/UI/Text';
import FlexCenter from '../components/UI/FlexCenter';
import Users from '../components/Reports/Users';
import Income from '../components/Reports/Income';

const Reports = () => {
  return (
    <ReportsWrapper>
      <FlexCenter>
        <Text tag="h2" variant="h2" color={tokens.colors.primaryDark3}>
          Reports
        </Text>
      </FlexCenter>

      <ElementWrapper>
        <Users />
        <Income />
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
