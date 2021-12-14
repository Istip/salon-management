import React from 'react';
import styled from 'styled-components';
import { useCollection } from '../hooks/useCollection';
import { useTranslation } from 'react-i18next';
import { tokens } from '../components/UI/tokens';

// Project imports
import UsersList from '../components/Admin/UsersList';
import FlexCenter from '../components/UI/FlexCenter';
import Text from '../components/UI/Text';

const Admin = () => {
  const { documents } = useCollection('users', null, null, null, false);

  const { t } = useTranslation();

  return (
    <AdminWrapper>
      <FlexCenter>
        <Text variant="h1">{t('admin.admin')}</Text>
      </FlexCenter>

      <br />

      <Box>
        <FlexCenter style={{ marginBottom: '20px' }}>
          <Text tag="h3" variant="h3" color={tokens.colors.primaryDark2}>
            {t('admin.user_list')}
          </Text>
        </FlexCenter>
        <UsersList users={documents} />
      </Box>
    </AdminWrapper>
  );
};

// styled components
const AdminWrapper = styled.div`
  margin: 80px 10px;
`;

const Box = styled.div`
  border: 1px solid ${tokens.colors.primaryLight3};
  background: ${tokens.colors.fff};
  padding: 20px;
  border-radius: 12px;
  margin: 10 20px 20px;
  max-height: ${(props) => props.height || 'auto'};
`;

export default Admin;
