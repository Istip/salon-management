import React from 'react';
import styled from 'styled-components';
import moment from 'moment';
import { tokens } from '../UI/tokens';

// project components
import Text from '../UI/Text';
import FlexCenter from '../UI/FlexCenter';
import EllipsisIcon from '../icons/EllipsisIcon';
import PhoneIcon from '../icons/PhoneIcon';
import HistoryIcon from '../icons/HistoryIcon';

const Client = ({ client }) => {
  return (
    <ClientWrapper>
      <ClientContainer>
        <LeftSide>
          <Info>
            <GenderBadge gender={client.gender}>
              <span>{client.elite && '⭐'}</span>
              <Text variant="medium8" color="#fff">
                {client.gender.toUpperCase()}
              </Text>
            </GenderBadge>
            <User>
              <Text
                tag="div"
                variant="black14"
                color={tokens.colors.primaryDark3}
              >
                {client.name}
              </Text>
              <Text
                tag="div"
                variant="medium12"
                color={tokens.colors.mediumGrey}
              >
                <FlexCenter>
                  <PhoneIcon color={tokens.colors.mediumGrey} size={18} />
                  <div style={{ marginLeft: '5px' }}>{client.phone}</div>
                </FlexCenter>
              </Text>
            </User>
          </Info>
        </LeftSide>

        <RightSide>
          <a href={`tel:${client.phone}`}>
            <EllipsisIcon size={18} />
          </a>
        </RightSide>
      </ClientContainer>

      <Divider>
        <Text tag="span" variant="medium10">
          <FlexCenter style={{ gap: '5px' }}>
            <HistoryIcon color={tokens.colors.primaryLight2} size={12} />{' '}
            History
          </FlexCenter>
        </Text>
      </Divider>

      <Stats>
        {client.visits.map((visit) => (
          <Text
            key={visit.seconds}
            variant="medium12"
            color={tokens.colors.primaryDark1}
          >
            {moment(visit.seconds * 1000).format('MMMM DD, YYYY')}
          </Text>
        ))}
      </Stats>
    </ClientWrapper>
  );
};

// styled components

const Divider = styled.div`
  width: 100%;
  height: 1px;
  color: ${tokens.colors.primaryLight2};
  background: ${tokens.colors.lightGrey};
  margin: 16px 0;
  display: flex;
  align-items: center;
  justify-content: center;

  span {
    margin-top: -2px;
    padding: 0 10px;
    text-align: left;
    background: #fff;
  }
`;

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
  position: relative;
  padding: 4px 8px;
  text-align: center;
  width: 50px;
  height: 18px;
  background: ${(props) =>
    props.gender === 'male'
      ? `${tokens.colors.primary}`
      : `${tokens.colors.pink}`};
  border-radius: 10px;

  span {
    position: absolute;
    top: -8px;
    right: -4px;
    font-size: 10px;
  }
`;

const Info = styled.div`
  display: flex;
  justify-content: center;
  gap: 10px;
`;

const User = styled.div`
  display: flex;
  flex-direction: column;
  gap: 5px;
`;

const Stats = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 10px;

  p {
    font-feature-settings: 'tnum' on, 'lnum' on;
  }
`;

const RightSide = styled.div`
  cursor: pointer;
`;

const ClientWrapper = styled.div`
  border: 1px solid ${tokens.colors.primaryLight3};
  background: #fff;
  padding: 10px;
  border-radius: 12px;
  margin-top: 10px;

  &:not(:last-child) {
    margin-bottom: 20px;
  }
`;

export default Client;
