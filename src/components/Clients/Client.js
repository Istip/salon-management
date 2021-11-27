import React from 'react';
import styled from 'styled-components';
import { tokens } from '../UI/tokens';

// project components
import Text from '../UI/Text';

const Client = ({ client }) => {
  return (
    <ClientWrapper>
      <ClientContainer>
        <LeftSide>
          <Info>
            <GenderBadge gender={client.gender}>
              <Text variant="medium8" color="#fff">
                {client.gender.toUpperCase()}
              </Text>
            </GenderBadge>
            <span>{client.elite && '⭐'}</span>
            <Text
              tag="div"
              variant="black14"
              color={tokens.colors.primaryDark3}
            >
              {client.name}
            </Text>
          </Info>

          <Stats>Stats</Stats>
        </LeftSide>

        <RightSide>⋮</RightSide>
      </ClientContainer>
    </ClientWrapper>
  );
};

// styled components
const ClientContainer = styled.div`
  display: flex;
  justify-content: space-between;
`;

const LeftSide = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  gap: 10px;
`;

const GenderBadge = styled.div`
  padding: 4px 8px;
  text-align: center;
  width: 50px;
  background: ${(props) =>
    props.gender === 'male'
      ? `${tokens.colors.primary}`
      : `${tokens.colors.pink}`};
  border-radius: 10px;
`;

const Info = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
`;

const Stats = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
`;

const RightSide = styled.div``;

const ClientWrapper = styled.div`
  border: 1px solid ${tokens.colors.primaryLight3};
  background: #fff;
  padding: 10px;
  border-radius: 12px;
  margin-top: 10px;

  &:not(:last-child) {
    margin-bottom: 10px;
  }
`;

export default Client;
