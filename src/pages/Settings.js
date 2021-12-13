import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { useCollection } from '../hooks/useCollection';
import { tokens } from '../components/UI/tokens';

// project imports
import LanguageSelector from '../components/Settings/LanguageSelector';
import Error from '../components/UI/Error';
import Operations from '../components/Settings/Operations';
import OperationForm from '../components/Settings/OperationForm';

const Settings = ({ setLanguage }) => {
  const { documents, error } = useCollection('users');

  if (!documents) {
    return <>{error && <Error>{error}</Error>}</>;
  }

  return (
    <SettingsWrapper>
      <SettingCard>
        <Operations documents={documents} />
        <DividerLine />
        <OperationForm user={documents} />
      </SettingCard>

      <SettingCard>
        <LanguageSelector setLanguage={setLanguage} />
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
  background: ${tokens.colors.fff};
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

const DividerLine = styled.div`
  width: 100%;
  height: 1px;
  background: ${tokens.colors.primaryLight4};
  margin: 10px 0;
`;

export default Settings;

// Prop types
Settings.propTypes = {
  setLanguage: PropTypes.func.isRequired,
};
