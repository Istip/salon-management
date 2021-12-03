import React from 'react';
import styled from 'styled-components';
import moment from 'moment';
import { useCollection } from '../../hooks/useCollection';
import { tokens } from '../UI/tokens';

// project components
import Text from '../UI/Text';

const Income = () => {
  const { documents, error } = useCollection('events', [
    'finished',
    '==',
    true,
  ]);

  if (!documents) {
    return null;
  }

  if (error) {
    return <div>{error}</div>;
  }

  console.log(documents.map((a) => a.date));

  const income = documents.reduce(
    (accumulator, current) => accumulator + parseInt(current.price),
    0
  );
  console.log(income);

  return (
    <IncomeWrapper>
      <IncomeInfo style={{ padding: '20px' }}>
        <Text variant="black14" color={tokens.colors.primaryDark3}>
          {moment().format('MMMM')} income:
        </Text>

        <Text variant="black14" color={tokens.colors.primary}>
          {income} RON
        </Text>
      </IncomeInfo>
    </IncomeWrapper>
  );
};

const IncomeWrapper = styled.div`
  border: 1px solid ${tokens.colors.primaryLight3};
  background: #fff;
  padding: 10px;
  border-radius: 12px;
  margin-top: 10px;
  margin-bottom: 20px;
`;

const IncomeInfo = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const DividerLine = styled.div`
  width: 100%;
  height: 1px;
  background: ${tokens.colors.primaryLight4};
  margin-bottom: 20px;
`;

export default Income;
