import React, { useState } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import moment from 'moment';
import { useFirestore } from '../../hooks/useFirestore';
import { useTranslation } from 'react-i18next';
import { tokens } from '../UI/tokens';

// project components
import DropdownIcon from '../icons/DropdownIcon';
import CheckIcon from '../icons/CheckIcon';
import Text from '../UI/Text';
import Button from '../UI/Button';
import FlexCenter from '../UI/FlexCenter';
import DeleteIcon from '../icons/DeleteIcon';
import UndoIcon from '../icons/UndoIcon';
import TimeIcon from '../icons/TimeIcon';

const Event = ({ event, setSelected, setShowPay }) => {
  const [visible, setVisible] = useState(false);

  const { deleteDocument, updateDocument } = useFirestore('events');

  const { t } = useTranslation();

  // Function to save selected event to state and open modal
  const handlePriceModal = async () => {
    await setSelected(event);
    setShowPay(true);
  };

  // Function returning different action for button, based on finished status
  const handleDeleteButton = () => {
    setVisible(false);

    if (!event.finished) {
      return deleteDocument(event.id);
    }

    return updateDocument(event.id, {
      ...event,
      finished: false,
      price: 0,
    });
  };

  // Function return if the date is today and event is not finished yet
  const isUnfinishedEvent = (appointment) => {
    return (
      moment(appointment.date.seconds * 1000).format('YY:MM:DD') <=
        moment().format('YY:MM:DD') && !event.finished
    );
  };

  // Function to return the time calculating if the client lates
  const returnLate = (event) => {
    if (event.late !== 0) {
      return moment(event.date.seconds * 1000)
        .add(event.late, 'minutes')
        .format('HH:mm');
    }

    return moment(event.date.seconds * 1000).format('HH:mm');
  };

  // Function for opening the given event's hidden buttons content
  const handleOpen = (event) => {
    if (!event.finished) {
      return setVisible(!visible);
    }

    return;
  };

  const lateColor = event.finished
    ? tokens.colors.primaryLight1
    : tokens.colors.mediumGrey;

  return (
    <>
      <EventWrapper>
        <EventInfo>
          <EventTime>
            <Text
              tag="div"
              variant="black10"
              color={tokens.colors.primaryDark2}
            >
              {returnLate(event)}
            </Text>
          </EventTime>

          <EventCard finished={event.finished}>
            <>
              {parseInt(event.late) > 0 ? (
                <FlexCenter style={{ marginTop: '6px', gap: '2px' }}>
                  <TimeIcon color={lateColor} size={12} />

                  <Text tag="div" variant="regular10" color={lateColor}>
                    {`${moment(event.date.seconds * 1000).format('HH:mm')} ${t(
                      'dashboard.late'
                    )}: ${event.late} ${t('dashboard.minutes')}`}
                  </Text>
                </FlexCenter>
              ) : null}
            </>

            <VisibleContent onClick={() => handleOpen(event)}>
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
                    {t(`client.${event.gender}`)}
                  </Text>
                </EventDescription>
              </Content>

              <FlexCenter style={{ gap: '6px' }}>
                {event.finished && (
                  <FlexCenter>
                    <Button
                      variant={event.price ? 'neutral' : 'primary'}
                      disabled={event.price}
                      style={{ pointerEvents: event.price ? 'none' : 'auto' }}
                      onClick={() => handlePriceModal(event)}
                    >
                      <FlexCenter style={{ flexDirection: 'column' }}>
                        <Text variant="medium12">
                          {!event.price
                            ? t('dashboard.paid')
                            : t('dashboard.income')}
                        </Text>

                        {event.price !== 0 && (
                          <Text variant="regular8">{event.price} RON</Text>
                        )}
                      </FlexCenter>
                    </Button>
                  </FlexCenter>
                )}

                <DropDown
                  onClick={() => setVisible(!visible)}
                  className={visible ? 'visible' : ''}
                >
                  <DropdownIcon />
                </DropDown>
              </FlexCenter>
            </VisibleContent>

            {visible && (
              <ExtraContent finished={event.finished}>
                <Button
                  block
                  variant="error"
                  icon={
                    event.finished ? (
                      <UndoIcon color={tokens.colors.error} />
                    ) : (
                      <DeleteIcon color={tokens.colors.error} />
                    )
                  }
                  onClick={handleDeleteButton}
                >
                  {event.finished
                    ? t('dashboard.cancel')
                    : t('dashboard.delete')}
                </Button>

                {isUnfinishedEvent(event) && (
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
                    {t('dashboard.finish')}
                  </Button>
                )}
              </ExtraContent>
            )}
          </EventCard>
        </EventInfo>
      </EventWrapper>
    </>
  );
};

// styled components
const EventWrapper = styled.div`
  margin: 0 10px;
`;

const EventInfo = styled.div`
  width: 100%;
  display: flex;
  min-height: 60px;
  margin: 5px 0;
`;

const EventTime = styled.span`
  position: relative;
  min-width: 50px;
  max-width: 50px;
  display: flex;
  justify-content: center;
  padding: 10px;

  /* monospace the numbers */
  font-feature-settings: 'tnum' on, 'lnum' on;

  span {
    position: absolute;
  }
`;

const EventCard = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  background: ${(props) =>
    props.finished ? `${tokens.colors.primaryLight3}` : `${tokens.colors.fff}`};

  border: 1px solid ${tokens.colors.primaryLight3};
  border-left: 3px solid ${tokens.colors.primaryLight3};
  border-radius: 0 12px 12px 0;
  transition: 250ms ease;

  &:hover {
    border: 1px solid ${tokens.colors.primary};
    border-left: 3px solid ${tokens.colors.primary};
    box-shadow: 0 0 10px 0 rgba(14, 44, 77, 0.15);
  }
`;

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
  border-top: ${(props) =>
    props.finished
      ? `1px solid ${tokens.colors.primaryLight2}`
      : `1px solid ${tokens.colors.lightGrey}`};
  text-align: center;
  transition: 250ms ease;
  padding: 10px;
  background: ${tokens.colors.fff};
  border-radius: 0 0 12px 0;
`;

const DropDown = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
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
`;

const EventDescription = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: 0 10px;
`;

export default Event;

// Prop types
Event.propTypes = {
  event: PropTypes.shape({
    action: PropTypes.string,
    date: PropTypes.shape({
      seconds: PropTypes.number,
      nanoseconds: PropTypes.number,
    }),
    finished: PropTypes.bool,
    gender: PropTypes.oneOf(['male', 'female']),
    id: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
    name: PropTypes.string,
    price: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  }),
  setSelected: PropTypes.func,
  setShowPay: PropTypes.func,
};
