import React from 'react';
import styled from 'styled-components';
import moment from 'moment';
import { useCollection } from '../../hooks/useCollection';
import { useTranslation } from 'react-i18next';
import { capitalize } from '../../utils/capitalize';
import { tokens } from '../UI/tokens';

// project components
import Text from '../UI/Text';
import FlexCenter from '../UI/FlexCenter';
import Error from '../UI/Error';
import i18n from '../../translations/i18n';

const Income = () => {
  const date = new Date();
  const monthFirstDay = new Date(date.getFullYear(), date.getMonth(), 1);

  const { t } = useTranslation();

  const { documents, error } = useCollection(
    'events',
    ['date', '>=', monthFirstDay],
    ['finished', '==', true]
  );

  if (!documents) {
    return null;
  }

  if (error) {
    return <Error>{error}</Error>;
  }

  const income = documents.reduce(
    (accumulator, current) => accumulator + parseInt(current.price),
    0
  );

  const maleClients = documents.filter((doc) => doc.gender === 'male');
  const femaleClients = documents.filter((doc) => doc.gender === 'female');

  return (
    <IncomeWrapper>
      <FlexCenter>
        <Text tag="h2" variant="h2" color={tokens.colors.primaryDark3}>
          {t('reports.stats')}
        </Text>
      </FlexCenter>
      <IncomeInfo style={{ padding: '20px' }}>
        <Text variant="black14" color={tokens.colors.primaryDark3}>
          {capitalize(moment().format('MMMM'))}
          {i18n.language === 'hu' && 'i'} {t('reports.income')}:
        </Text>

        <Text
          variant="black14"
          color={income > 0 ? tokens.colors.success : tokens.colors.error}
        >
          {income} RON
        </Text>
      </IncomeInfo>

      <DividerLine />

      <IncomeInfo style={{ padding: '20px' }}>
        <Text variant="black14" color={tokens.colors.primaryDark3}>
          {t('reports.total_female_clients')}
        </Text>

        <Text variant="black14" color={tokens.colors.primary}>
          {femaleClients.length}
        </Text>
      </IncomeInfo>

      <IncomeInfo style={{ padding: '20px' }}>
        <Text variant="black14" color={tokens.colors.primaryDark3}>
          {t('reports.total_male_clients')}
        </Text>

        <Text variant="black14" color={tokens.colors.primary}>
          {maleClients.length}
        </Text>
      </IncomeInfo>
    </IncomeWrapper>
  );
};

const IncomeWrapper = styled.div`
  border: 1px solid ${tokens.colors.primaryLight3};
  background: ${tokens.colors.fff};
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
`;

export default Income;
