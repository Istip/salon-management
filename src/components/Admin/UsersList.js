import React from 'react';
import styled from 'styled-components';
import { useTranslation } from 'react-i18next';
import { tokens } from '../UI/tokens';

// project imports\
import FlexCenter from '../UI/FlexCenter';
import FlexBetween from '../UI/FlexBetween';
import Text from '../UI/Text';

const UsersList = ({ users }) => {
  const { t } = useTranslation();

  if (!users) {
    return (
      <FlexCenter>
        <Text variant="regular16">{t('common.loading')}</Text>
      </FlexCenter>
    );
  }

  return (
    <Inner>
      {users.map((user) => (
        <FlexBetween key={user.id}>
          <FlexCenter>
            <Dot status={user.online} />
            <DataContainer>
              <Text variant="black14" color={tokens.colors.primaryDark3}>
                {user.displayName}
              </Text>
              <Text variant="regular12">{user.email}</Text>
              <Text tag="small" variant="regular10">
                <b>ID:</b> {user.id}
              </Text>
            </DataContainer>
          </FlexCenter>
          <Text variant="medium10" color={tokens.colors.mediumGrey}>
            {user.membership}
          </Text>
        </FlexBetween>
      ))}
    </Inner>
  );
};

// styled components

const Inner = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;

  flex-direction: column;
  gap: 20px;
`;

const Dot = styled.div`
  margin-right: 10px;
  width: 8px;
  height: 8px;
  border-radius: 20px;
  background: ${(props) =>
    props.status ? `${tokens.colors.success}` : `${tokens.colors.error}`};
  border: 1px solid ${tokens.colors.primaryDark3};
`;

const DataContainer = styled.div`
  display: flex;
  justify-content: center;
  flex-direction: column;

  small {
    margin-top: 4px;
    font-feature-settings: 'tnum' on, 'lnum' on;
  }
`;

export default UsersList;
