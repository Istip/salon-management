import React from 'react';
import { useTranslation } from 'react-i18next';
import { tokens } from '../UI/tokens';

// project components
import Text from '../UI/Text';
import FlexCenter from '../UI/FlexCenter';

const Actions = ({ actions }) => {
  console.log(actions);

  const { t } = useTranslation();

  return (
    <>
      <Text tag="h2" variant="h2" color={tokens.colors.primaryDark3}>
        {t('settings.operations')}
      </Text>

      <FlexCenter style={{ textAlign: 'center', lineHeight: '150%' }}>
        <Text variant="regular14">{t('settings.operation_description')}</Text>
      </FlexCenter>
    </>
  );
};

export default Actions;
