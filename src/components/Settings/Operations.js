import React from 'react';
import styled from 'styled-components';
import { useTranslation } from 'react-i18next';
import { tokens } from '../UI/tokens';

// project components
import Text from '../UI/Text';
import FlexCenter from '../UI/FlexCenter';

const Operations = ({ documents }) => {
  const operations = documents[0].actions;

  const { t } = useTranslation();

  // TODO: Add validation on adding an existing operation

  // TODO: Add validation for the last deletable operation

  return (
    <>
      <Text tag="h2" variant="h2" color={tokens.colors.primaryDark3}>
        {t('settings.operations')}
      </Text>

      <FlexCenter style={{ textAlign: 'center', lineHeight: '150%' }}>
        <Text variant="regular14">{t('settings.operation_description')}</Text>
      </FlexCenter>

      <OperationsWrapper>
        {operations.map((operation, i) => (
          <OperationBadge
            key={i}
            onClick={(e) => console.log(e.target.outerText)}
          >
            <Text variant="medium8" color={tokens.colors.primary}>
              {operation}
            </Text>
          </OperationBadge>
        ))}
      </OperationsWrapper>
    </>
  );
};

// styeld components
const OperationsWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-wrap: wrap;
  gap: 5px;
`;

const OperationBadge = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
  min-width: 48px;
  height: 48px;
  padding: 4px;
  background: ${tokens.colors.primaryLight4};
  border: 1px solid ${tokens.colors.primary};
  border-radius: 10px;
  transition: 250ms ease;
`;

export default Operations;
