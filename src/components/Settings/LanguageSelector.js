import React from 'react';
import PropTypes from 'prop-types';
import i18n from '../../translations/i18n';
import { useTranslation } from 'react-i18next';
import { tokens } from '../UI/tokens';

// project components
import FlexCenter from '../UI/FlexCenter';
import Text from '../UI/Text';
import Button from '../UI/Button';
import FlexBetween from '../UI/FlexBetween';

const LanguageSelector = ({ setLanguage }) => {
  const { t } = useTranslation();

  return (
    <>
      <Text tag="h2" variant="h2" color={tokens.colors.primaryDark3}>
        {t('settings.language')}
      </Text>

      <FlexBetween>
        <Text tag="div" variant="black14" color={tokens.colors.primaryDark3}>
          {t('settings.language_select')}:
        </Text>

        <FlexCenter style={{ gap: '5px' }}>
          <Button
            variant={i18n.language !== 'en' && 'secondary'}
            size="small"
            onClick={() => setLanguage('en')}
          >
            <Text variant="black12">EN</Text>
          </Button>

          <Button
            variant={i18n.language !== 'hu' && 'secondary'}
            size="small"
            onClick={() => setLanguage('hu')}
          >
            <Text variant="black12">HU</Text>
          </Button>
        </FlexCenter>
      </FlexBetween>
    </>
  );
};

// Prop types
LanguageSelector.propTypes = {
  setLanguage: PropTypes.func.isRequired,
};

export default LanguageSelector;
