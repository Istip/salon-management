import React, { useState } from 'react';
import styled from 'styled-components';
import moment from 'moment';
import { tokens } from '../UI/tokens';
import { useFirestore } from '../../hooks/useFirestore';

// project components
import DropdownIcon from '../icons/DropdownIcon';
import CheckIcon from '../icons/CheckIcon';
import Text from '../UI/Text';
import Button from '../UI/Button';
import FlexCenter from '../UI/FlexCenter';
import DeleteIcon from '../icons/DeleteIcon';

const Event = ({ event, setSelected, setShowPay }) => {
  const [visible, setVisible] = useState(false);

  const { deleteDocument, updateDocument } = useFirestore('events');

  const handlePriceModal = async () => {
    await setSelected(event);
    setShowPay(true);
  };

  return (
    <EventWrapper>
      <EventInfo>
        <EventTime>
          <Text variant="black10" color={tokens.colors.primaryDark2}>
            {moment(event.date.seconds * 1000).format('HH:mm')}
          </Text>
        </EventTime>
        <EventCard finished={event.finished}>
          {moment(event.date.seconds * 1000).format('YY:MM:DD HH:mm') >
            moment().format('YY:MM:DD HH:mm') &&
            event.finished !== true && (
              <FlexCenter style={{ paddingTop: '10px' }}>
                <Text variant="medium10" color={tokens.colors.mediumGrey}>
                  Unfinished appointment
                </Text>
              </FlexCenter>
            )}

          <VisibleContent>
            <Content>
              <EventType>
                <Text variant="medium8" color={tokens.colors.primary}>
                  {event.action}
                </Text>
              </EventType>

              <EventDescription>
                <Text
                  tag="div"
                  variant="black14"
                  color={tokens.colors.primaryDark3}
                >
                  {event.name}
                </Text>
                <Text
                  tag="div"
                  variant="regular12"
                  color={tokens.colors.primary}
                >
                  {event.gender} {event.action}
                </Text>
              </EventDescription>
            </Content>

            {event.finished ? (
              <FlexCenter>
                <Button
                  variant={event.price ? 'neutral' : 'primary'}
                  disabled={event.price}
                  style={{ pointerEvents: event.price ? 'none' : 'auto' }}
                  onClick={() => handlePriceModal(event)}
                >
                  <FlexCenter style={{ flexDirection: 'column' }}>
                    <Text variant="medium14">
                      {!event.price ? 'Paid' : 'Income'}
                    </Text>

                    {event.price !== 0 && (
                      <Text variant="regular8">{event.price} RON</Text>
                    )}
                  </FlexCenter>
                </Button>
              </FlexCenter>
            ) : (
              <DropDown
                onClick={() => setVisible(!visible)}
                className={visible ? 'visible' : ''}
              >
                <DropdownIcon />
              </DropDown>
            )}
          </VisibleContent>

          <ExtraContent className={visible ? 'visible' : ''}>
            <Button
              block
              variant="error"
              icon={<DeleteIcon color={tokens.colors.error} />}
              onClick={() => deleteDocument(event.id)}
            >
              Delete
            </Button>

            {moment(event.date.seconds * 1000).format('YY:MM:DD') ===
              moment().format('YY:MM:DD') && (
              <Button
                block
                variant="success"
                icon={<CheckIcon color={tokens.colors.success} />}
                onClick={() => {
                  updateDocument(event.id, {
                    ...event,
                    finished: true,
                  });
                  setVisible(false);
                }}
              >
                Finish
              </Button>
            )}
          </ExtraContent>
        </EventCard>
      </EventInfo>
    </EventWrapper>
  );
};

// styled components
const Content = styled.div`
  display: flex;
`;

const VisibleContent = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 10px;
`;

const ExtraContent = styled.div`
  display: flex;
  justify-content: center;
  gap: 10px;
  border-top: 1px solid ${tokens.colors.lightGrey};
  text-align: center;
  max-height: 0;
  transition: 250ms ease;
  visibility: hidden;
  padding: 0 10px;
  opacity: 0;

  &.visible {
    max-height: 70px;
    visibility: visible;
    padding: 10px;
    opacity: 1;
  }
`;

const DropDown = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: 250ms ease;

  &.visible {
    transform: rotate(180deg);
  }
`;

const EventType = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
  min-width: 48px;
  max-width: 48px;
  height: 48px;
  padding: 4px;
  background: ${tokens.colors.primaryLight4};
  border: 1px solid ${tokens.colors.primary};
  border-radius: 10px;
  cursor: pointer;
`;

const EventDescription = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: 0 10px;
`;

const EventWrapper = styled.div`
  margin: 0 10px;
`;

const EventInfo = styled.div`
  width: 100%;
  display: flex;
  min-height: 60px;
  margin: 10px 0;
`;

const EventTime = styled.span`
  min-width: 50px;
  max-width: 50px;
  display: flex;
  justify-content: center;
  padding: 10px;

  /* monospace the numbers */
  font-feature-settings: 'tnum' on, 'lnum' on;
`;

const EventCard = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  background: ${(props) =>
    props.finished ? `${tokens.colors.primaryLight3}` : '#fff'};
  border: 1px solid ${tokens.colors.primaryLight3};
  border-radius: 12px;
`;

export default Event;
