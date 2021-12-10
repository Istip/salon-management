import React, { useState, useRef, useEffect } from 'react';
import styled from 'styled-components';
import moment from 'moment';
import { useFirestore } from '../../hooks/useFirestore';
import { useTranslation } from 'react-i18next';
import { timestamp } from '../../firebase/config';
import { tokens } from '../UI/tokens';

// project components
import Text from '../UI/Text';
import FlexCenter from '../UI/FlexCenter';
import Button from '../UI/Button';
import EllipsisIcon from '../icons/EllipsisIcon';
import PhoneIcon from '../icons/PhoneIcon';
import HistoryIcon from '../icons/HistoryIcon';
import ClientPopover from './ClientPopover';
import LocationIcon from '../icons/LocationIcon';
import SuccessIcon from '../icons/SuccessIcon';
import DropdownIcon from '../icons/DropdownIcon';

const Client = ({ client }) => {
  const [visible, setVisible] = useState(false);
  const [visitNumber, setVisitNumber] = useState(1);

  const { updateDocument } = useFirestore('clients');

  const { t } = useTranslation();

  const wrapperNode = useRef();

  // Function to handle click outside of a given dom element
  const handleClickOutside = (e) => {
    if (wrapperNode.current && wrapperNode.current.contains(e.target)) {
      return;
    }
    setVisible(false);
  };

  // Function to add a new check if for the client with the current day
  const handleAddCheckIn = (lastVisit) => {
    const dateFormat = (time) => moment(time).format('YY-MM-DD');

    const lastVisitTime =
      lastVisit.length && dateFormat(lastVisit[0].seconds * 1000);
    const currentTime = dateFormat();

    if (lastVisit && lastVisitTime !== currentTime) {
      return updateDocument(client.id, {
        visits: [timestamp.fromDate(new Date()), ...client.visits],
      });
    }
    return null;
  };

  // Check if there is a check in for the current day
  const handleLastCheckIn = (lastVisit) => {
    const dateFormat = (time) => moment(time).format('YY-MM-DD');

    const lastVisitTime = dateFormat(lastVisit[0].seconds * 1000);
    const currentTime = dateFormat();

    if (lastVisitTime === currentTime) return true;
  };

  useEffect(() => {
    if (wrapperNode) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
    // eslint-disable-next-line
  }, []);

  return (
    <ClientWrapper>
      <ClientContainer>
        <LeftSide>
          <Info>
            <GenderBadge gender={client.gender} elite={client.elite}>
              {client.elite && <Mark />}
              <Text variant="medium8" color="#fff">
                {t(`${client.gender}`.toUpperCase())}
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
                variant="medium10"
                color={tokens.colors.mediumGrey}
              >
                <FlexCenter>
                  <PhoneIcon color={tokens.colors.mediumGrey} size={18} />
                  <PhoneNumber>{client.phone}</PhoneNumber>
                </FlexCenter>
              </Text>
            </User>
          </Info>
        </LeftSide>

        <RightSide onClick={() => setVisible(!visible)}>
          <EllipsisIcon color={tokens.colors.primaryDark4} />
          <PopoverWrapper ref={wrapperNode}>
            <ClientPopover
              visible={visible}
              setVisible={setVisible}
              client={client}
            />
          </PopoverWrapper>
        </RightSide>
      </ClientContainer>

      {client.visits.length !== 0 && handleLastCheckIn(client.visits) ? (
        <Button
          variant="neutral"
          style={{ pointerEvents: 'none', marginTop: '10px' }}
          size="medium"
          icon={<SuccessIcon />}
        >
          {t('client.just_visited')}
        </Button>
      ) : (
        <Button
          variant="secondary"
          style={{ marginTop: '10px' }}
          size="medium"
          icon={<LocationIcon size={18} color={tokens.colors.primary} />}
          onClick={() => handleAddCheckIn(client.visits)}
        >
          {t('client.add_visit')}
        </Button>
      )}

      {client.visits.length !== 0 && (
        <>
          <Divider>
            <Text tag="span" variant="medium10">
              <FlexCenter style={{ gap: '5px' }}>
                <HistoryIcon color={tokens.colors.primaryLight2} size={16} />{' '}
                {client.visits.length === 1
                  ? t('client.only_visit')
                  : t('client.last_visit')}
              </FlexCenter>
            </Text>
          </Divider>

          <Stats>
            {client.visits.slice(0, visitNumber).map((visit) => (
              <Text
                key={visit.seconds}
                variant="medium12"
                color={tokens.colors.primaryDark1}
              >
                {moment(visit.seconds * 1000).format('MMMM DD, YYYY')}
              </Text>
            ))}

            {client.visits.length > visitNumber && (
              <DropdownButton
                onClick={() => setVisitNumber(client.visits.length)}
              >
                <FlexCenter>
                  <DropdownIcon color={tokens.colors.primaryDark2} />
                  <Text
                    tag="span"
                    variant="medium10"
                    color={tokens.colors.primaryDark2}
                  >
                    {t('client.show_all')}
                  </Text>
                </FlexCenter>
              </DropdownButton>
            )}
          </Stats>
        </>
      )}
    </ClientWrapper>
  );
};

// styled components

const PopoverWrapper = styled.span`
  position: absolute;
`;

const DropdownButton = styled.div`
  transition: 250ms ease;

  &.showAll {
    transform: rotate(180deg);
  }
`;

const Divider = styled.div`
  width: 100%;
  height: 1px;
  color: ${tokens.colors.primaryLight2};
  background: ${tokens.colors.lightGrey};
  margin: 16px 0 20px 0;
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

const Mark = styled.span`
  margin: 6px 3px 0 0;
  text-align: left;
  background: #fff;
  width: 8px;
  height: 8px;
  background: ${tokens.colors.warning};
  border: 1px solid ${tokens.colors.darkGrey};
  border-radius: 50%;
`;

const PhoneNumber = styled.div`
  margin-left: 5px;
  font-feature-settings: 'tnum' on, 'lnum' on;
  letter-spacing: 0.5px;
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
    box-shadow: 0 0 5px ${tokens.colors.warning};
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
  position: relative;
`;

const ClientWrapper = styled.div`
  border: 1px solid ${tokens.colors.primaryLight3};
  background: #fff;
  padding: 10px;
  border-radius: 12px;
  margin-top: 10px;
  margin-bottom: 20px;
`;

export default Client;
