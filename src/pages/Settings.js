import React from 'react';
import styled from 'styled-components';
import { useCollection } from '../hooks/useCollection';
import { tokens } from '../components/UI/tokens';

// project imports
import LanguageSelector from '../components/Settings/LanguageSelector';
import Error from '../components/UI/Error';
import Actions from '../components/Settings/Actions';

const Settings = () => {
  const { documents, error } = useCollection('users');

  if (!documents) {
    return <>{error && <Error>{error}</Error>}</>;
  }

  return (
    <SettingsWrapper>
      <SettingCard>
        <LanguageSelector />
      </SettingCard>

      <SettingCard>
        <Actions actions={documents} />
      </SettingCard>

      {error && <Error>{error}</Error>}
    </SettingsWrapper>
  );
};

// styled components
const SettingsWrapper = styled.div`
  margin: 80px 10px;
`;

const SettingCard = styled.div`
  border: 1px solid ${tokens.colors.primaryLight3};
  background: #fff;
  padding: 20px;
  border-radius: 12px;
  margin-top: 10px;
  margin-bottom: 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 10px;
`;

export default Settings;
