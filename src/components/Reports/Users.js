import React from 'react';
import styled from 'styled-components';
import { useCollection } from '../../hooks/useCollection';
import { Link } from 'react-router-dom';
import { tokens } from '../UI/tokens';

// project components
import FlexCenter from '../UI/FlexCenter';
import Text from '../UI/Text';
import Error from '../UI/Error';
import { useTranslation } from 'react-i18next';

const Users = () => {
  const { documents, error } = useCollection('clients');

  const { t } = useTranslation();

  if (!documents) {
    return null;
  }

  if (error) {
    return <Error>{error}</Error>;
  }

  const males = documents.filter((doc) => doc.gender === 'male');
  const females = documents.filter((doc) => doc.gender === 'female');

  return (
    <>
      <UsersWrapper>
        <FlexCenter>
          <Text tag="h2" variant="h2" color={tokens.colors.primaryDark3}>
            {t('reports.clients')}
          </Text>
        </FlexCenter>
        {documents.length ? (
          <>
            <UsersSummary>
              <Text variant="black14" color={tokens.colors.primaryDark3}>
                {t('reports.total')}:
              </Text>

              <Text variant="black14" color={tokens.colors.primary}>
                {documents.length}{' '}
                {documents.length <= 1 ? t('reports.c') : t('reports.cs')}
              </Text>
            </UsersSummary>

            <DividerLine />

            <GenderSummary>
              <GenderNumber className="female">
                <Text variant="regular12">
                  <b>{females.length}</b>{' '}
                  {females.length === 1
                    ? t('reports.female')
                    : t('reports.females')}
                </Text>
              </GenderNumber>

              <GenderNumber className="male">
                <Text variant="regular12">
                  <b>{males.length}</b>{' '}
                  {males.length === 1 ? t('reports.male') : t('reports.males')}
                </Text>
              </GenderNumber>
            </GenderSummary>
          </>
        ) : (
          <>
            <FlexCenter style={{ margin: '10px 0' }}>
              <Text variant="regular14" color={tokens.colors.primaryLight3}>
                {t('warning.no_clients')}
              </Text>
            </FlexCenter>
            <FlexCenter>
              <LinkWrapper>
                <Text variant="regular14" color={tokens.colors.primary}>
                  <Link to="/clients">{t('reports.add_client')}</Link>
                </Text>
              </LinkWrapper>
            </FlexCenter>
          </>
        )}
      </UsersWrapper>
    </>
  );
};

// styled components
const UsersWrapper = styled.div`
  border: 1px solid ${tokens.colors.primaryLight3};
  background: #fff;
  padding: 10px;
  border-radius: 12px;
  margin-top: 10px;
  margin-bottom: 20px;
`;

const UsersSummary = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 20px;
`;

const LinkWrapper = styled.div`
  transition: 250ms ease;
  margin-top: 5px;

  a {
    text-decoration: none;
    color: ${tokens.colors.primary};
    font-weight: 700;
  }
`;

const DividerLine = styled.div`
  width: 100%;
  height: 1px;
  background: ${tokens.colors.primaryLight4};
  margin-bottom: 20px;
`;

const GenderSummary = styled.div`
  padding: 0 20px 10px;

  display: flex;
  align-items: center;
  justify-content: center;
  gap: 20px;
`;

const GenderNumber = styled.div`
  border-radius: 4px;
  padding: 4px 12px;
  color: #fff;

  &.male {
    background: ${tokens.colors.primary};
  }

  &.female {
    background: ${tokens.colors.pink};
  }
`;

export default Users;
