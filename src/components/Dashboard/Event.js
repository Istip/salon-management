import React, { useState } from 'react';
import styled from 'styled-components';
import moment from 'moment';
import { tokens } from '../UI/tokens';

// project components
import Text from '../UI/Text';
import Button from '../UI/Button';
import DropdownIcon from '../icons/DropdownIcon';
import CheckIcon from '../icons/CheckIcon';

const Event = ({ event }) => {
  const [visible, setVisible] = useState(false);

  return (
    <EventWrapper>
      <EventInfo>
        <EventTime>
          <Text variant="black10" color={tokens.colors.primaryDark2}>
            {moment(event.date.seconds * 1000).format('HH:mm')}
          </Text>
        </EventTime>

        <EventCard>
          <VisibleContent>
            <Content>
              <EventType>
                <Text variant="medium8" color={tokens.colors.primary}>
                  {event.action}
                </Text>
              </EventType>

              <EventDescription>
                <Name>
                  <Text variant="black14" color={tokens.colors.primaryDark3}>
                    {event.name}
                  </Text>
                </Name>
                <Action>
                  <Text variant="regular12" color={tokens.colors.primary}>
                    {event.gender} {event.action}
                  </Text>
                </Action>
              </EventDescription>
            </Content>

            <DropDown
              onClick={() => setVisible(!visible)}
              className={visible ? 'visible' : ''}
            >
              <DropdownIcon />
            </DropDown>
          </VisibleContent>

          <ExtraContent className={visible ? 'visible' : ''}>
            <Button size="medium" block>
              {event.gender.toUpperCase()}
            </Button>
            <Button
              size="medium"
              variant="error"
              icon={<CheckIcon color={tokens.colors.error} />}
            />
            <Button
              size="medium"
              variant="success"
              icon={<CheckIcon color={tokens.colors.success} />}
            />
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
  padding: 0;
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
  width: 48px;
  height: 48px;
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

const Name = styled.div``;

const Action = styled.div``;

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
  align-items: center;
  justify-content: center;
  padding: 10px;
  /* monospace the numbers */
  font-feature-settings: 'tnum' on, 'lnum' on;
`;

const EventCard = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  background: #fff;
  border: 1px solid ${tokens.colors.primaryLight3};
  border-radius: 12px;
`;

export default Event;
