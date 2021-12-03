import React from 'react';
import styled from 'styled-components';
import { useCollection } from '../../hooks/useCollection';
import { Link } from 'react-router-dom';
import { tokens } from '../UI/tokens';

// project components
import FlexCenter from '../UI/FlexCenter';
import Text from '../UI/Text';

const Users = () => {
  const { documents, error } = useCollection('clients');

  if (!documents) {
    return null;
  }

  if (error) {
    return <div>{error}</div>;
  }

  const males = documents.filter((doc) => doc.gender === 'male');
  const females = documents.filter((doc) => doc.gender === 'female');

  return (
    <>
      <UsersWrapper>
        {documents.length ? (
          <>
            <UsersSummary>
              <Text variant="black14" color={tokens.colors.primaryDark3}>
                Total:
              </Text>

              <Text variant="black14" color={tokens.colors.primary}>
                {documents.length} clients
              </Text>
            </UsersSummary>

            <DividerLine />

            <GenderSummary>
              <GenderNumber className="male">
                <Text variant="regular12">
                  <b>{males.length}</b> {males.length === 1 ? 'male' : 'males'}
                </Text>
              </GenderNumber>
              <GenderNumber className="female">
                <Text variant="regular12">
                  <b>{females.length}</b>{' '}
                  {females.length === 1 ? 'female' : 'females'}
                </Text>
              </GenderNumber>
            </GenderSummary>
          </>
        ) : (
          <>
            <FlexCenter>
              <Text variant="regular14" color={tokens.colors.primaryLight3}>
                You haven't added any clients yet!
              </Text>
            </FlexCenter>
            <FlexCenter>
              <LinkWrapper>
                <Text variant="regular14" color={tokens.colors.primary}>
                  <Link to="/clients">Add Clinets now</Link>
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
