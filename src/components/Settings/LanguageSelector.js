import React, { useEffect } from 'react';
import moment from 'moment';
import i18n from '../../translations/i18n';
import { useTranslation } from 'react-i18next';
import { useLocalStorage } from '../../hooks/useLocalStorage';
import { tokens } from '../UI/tokens';

// project components
import FlexCenter from '../UI/FlexCenter';
import Text from '../UI/Text';
import Button from '../UI/Button';
import FlexBetween from '../UI/FlexBetween';

// moment locale imports
import 'moment/locale/hu';
import 'moment/locale/en-gb';

const LanguageSelector = () => {
  const [language, setLanguage] = useLocalStorage('language', 'hu');

  const { t } = useTranslation();

  useEffect(() => {
    moment.locale(language);
    i18n.changeLanguage(language);
  }, [language]);

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
            variant={language !== 'en' && 'secondary'}
            size="small"
            onClick={() => setLanguage('en')}
          >
            <Text variant="black12">EN</Text>
          </Button>

          <Button
            variant={language !== 'hu' && 'secondary'}
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

export default LanguageSelector;
