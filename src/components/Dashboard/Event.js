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
import CurrentTime from '../UI/CurrentTime';

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

  // Function return if date is after the current moment
  const ifFutureEvent = (appointment) => {
    const formatTime =
      moment(appointment.date.seconds * 1000).format('YY:MM:DD HH:mm') >
      moment().format('YY:MM:DD HH:mm');

    const notFinished = event.finished !== true;

    if (formatTime && notFinished) return true;
  };

  const getTimeData = () => {
    const time = moment(event.date.seconds * 1000);

    const after = moment(time).isAfter(moment());
    const diff = moment().diff(time, 'minutes');

    return { after, diff };
  };

  const timeData = getTimeData();

  return (
    <>
      {timeData.after && timeData.diff >= -30 && <CurrentTime />}

      <EventWrapper>
        <EventInfo>
          <EventTime>
            <Text
              tag="div"
              variant="black10"
              color={tokens.colors.primaryDark2}
            >
              {moment(event.date.seconds * 1000).format('HH:mm')}
            </Text>
          </EventTime>

          <EventCard finished={event.finished}>
            {ifFutureEvent(event) && (
              <FlexCenter style={{ paddingTop: '10px' }}>
                <Text variant="medium10" color={tokens.colors.mediumGrey}>
                  {t('dashboard.unfinished_appointment')}
                </Text>
              </FlexCenter>
            )}

            <VisibleContent>
              <Content onClick={() => setVisible(!visible)}>
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

            <ExtraContent
              className={visible ? 'visible' : ''}
              finished={event.finished}
            >
              <Button
                block
                variant="error"
                icon={<DeleteIcon color={tokens.colors.error} />}
                onClick={handleDeleteButton}
              >
                {event.finished ? t('dashboard.cancel') : t('dashboard.delete')}
              </Button>

              {moment(event.date.seconds * 1000).format('YY:MM:DD') <=
                moment().format('YY:MM:DD') &&
                !event.finished && (
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
  max-height: 0;
  transition: 250ms ease;
  visibility: hidden;
  padding: 0 10px;
  pointer-events: none;
  overflow: hidden;
  opacity: 0;

  &.visible {
    pointer-events: auto;
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
  next: PropTypes.any,
  setSelected: PropTypes.func,
  setShowPay: PropTypes.func,
};
