import React, { useEffect, useRef, useState } from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import styled from 'styled-components';
import { useTranslation } from 'react-i18next';
import { capitalize } from '../../utils/capitalize';
import { tokens } from '../UI/tokens';

// project components
import ArrowLeftIcon from '../icons/ArrowLeftIcon';
import ArrowRightIcon from '../icons/ArrowRightIcon';
import DropdownIcon from '../icons/DropdownIcon';
import TimeIcon from '../icons/TimeIcon';
import Text from '../../components/UI/Text';
import Button from '../../components/UI/Button';
import FlexCenter from '../../components/UI/FlexCenter';

const Calendar = ({ selectedDate, setSelectedDate, documents }) => {
  const [date, setDate] = useState(moment());
  const [visible, setVisible] = useState(true);

  const { t } = useTranslation();

  const dayRef = useRef();

  const daysOfWeekend = ['szo', 'v', 'Sa', 'Su'];

  const plusMonth = () => {
    setDate(moment(date).add(1, 'month'));
  };

  const minusMonth = () => {
    setDate(moment(date).subtract(1, 'month'));
  };

  const getDaysOfTheMonth = () => {
    let daysInMonth = moment(date).daysInMonth();
    let arrDays = [];

    while (daysInMonth) {
      const current = moment(date).date(daysInMonth);
      arrDays.push(current);
      daysInMonth--;
    }

    return arrDays.sort((a, b) => a - b);
  };

  // Function to check if today is selected
  const todayIsSelected = () => {
    const today = moment().format('YY-MM-DD');
    const selected = selectedDate.format('YY-MM-DD');
    if (today !== selected) {
      return true;
    }
  };

  // This function resets the date to the current day
  const handleResetDate = () => {
    if (todayIsSelected()) {
      setSelectedDate(moment());
      setDate(moment());
    }
  };

  // Function checks if the day property is the same as the current day
  const isToday = (day) => {
    if (day.format('YY-MM-DD') === selectedDate.format('YY-MM-DD')) {
      return true;
    }
  };

  const daysOfMonth = getDaysOfTheMonth();

  useEffect(() => {
    if (dayRef.current) {
      dayRef.current.childNodes[selectedDate.format('D') - 1].scrollIntoView({
        behavior: 'smooth',
        block: 'center',
        inline: 'center',
      });
    }
    // eslint-disable-next-line
  }, [selectedDate]);

  const Dot = ({ day }) => {
    const dayWithAppointment =
      documents &&
      documents.some(
        (item) =>
          moment(item.date.seconds * 1000).format('YY-MM-DD') ===
          moment(day).format('YY-MM-DD')
      );

    if (!dayWithAppointment) {
      return null;
    }

    return <>•</>;
  };

  return (
    <CalendarWrapper onClick={() => !visible && setVisible(true)}>
      <MonthSelector visible={visible}>
        <ArrowWrapper onClick={minusMonth} visible={visible}>
          <ArrowLeftIcon color={tokens.colors.primaryDark3} />
        </ArrowWrapper>

        <FlexCenter style={{ gap: '10px' }}>
          <Text variant="black14" color={tokens.colors.primaryDark3}>
            {visible
              ? date.format('YYYY MMMM')
              : selectedDate.format('YYYY MMMM D')}
          </Text>

          {todayIsSelected() && (
            <Button
              variant="neutral"
              size="small"
              onClick={() => handleResetDate()}
              title={`${t('dashboard.jump_back')} ${moment().format(
                'YYYY-MM-DD'
              )}`}
            >
              <FlexCenter style={{ gap: '5px' }}>
                <TimeIcon size={12} />{' '}
                <Text variant="regular8">{t('dashboard.today')}</Text>
              </FlexCenter>
            </Button>
          )}
        </FlexCenter>

        <ArrowWrapper onClick={plusMonth} visible={visible}>
          <ArrowRightIcon color={tokens.colors.primaryDark3} />
        </ArrowWrapper>
      </MonthSelector>

      <DaySelector>
        <DaySelectorWrapper className={visible ? 'visible' : ''} ref={dayRef}>
          {daysOfMonth.map((day) => (
            <DayWrapper
              key={day.format('DD')}
              onClick={() => setSelectedDate(day)}
            >
              <Day
                className={
                  isToday(day)
                    ? `today ${day.format('dd')}`
                    : `${day.format('dd')}`
                }
                today={day.format('YY-MM-DD') === moment().format('YY-MM-DD')}
                weekend={daysOfWeekend.includes(day.format('dd'))}
              >
                <Text variant="medium8" tag="div">
                  {capitalize(day.format('ddd'))}
                </Text>
                <Text variant="black12" tag="div">
                  {day.format('DD')}
                </Text>
              </Day>

              <DotReminder className={visible ? 'visible' : ''}>
                <Dot day={day} />
              </DotReminder>
            </DayWrapper>
          ))}
        </DaySelectorWrapper>
      </DaySelector>

      <CloseBar onClick={() => setVisible(!visible)} visible={visible}>
        <IconWrapper className={!visible ? 'visible' : ''}>
          <FlexCenter>
            <DropdownIcon />
          </FlexCenter>
        </IconWrapper>
      </CloseBar>
    </CalendarWrapper>
  );
};

// styled components
const CalendarWrapper = styled.div`
  background: ${tokens.colors.fff};
  box-shadow: 0px 4px 20px -8px rgba(14, 44, 77, 0.15);
  margin-bottom: 20px;
  transition: 500ms ease;

  &:hover {
    box-shadow: 0px 8px 20px -4px rgba(14, 44, 77, 0.2);
  }
`;

const MonthSelector = styled.div`
  width: 100%;
  padding: 20px 20px 0;
  display: flex;
  align-items: center;
  justify-content: space-between;
  transition: 250ms ease;
`;

const DaySelector = styled.div`
  overflow-x: auto;
  -ms-overflow-style: none;
  scrollbar-width: none;
  scroll-snap-align: end;
  transition: 250ms ease;

  &::-webkit-scrollbar {
    display: none;
  }
`;

const DaySelectorWrapper = styled.div`
  display: flex;
  /* gap: 10px; */
  scroll-snap-type: y mandatory;
  opacity: 0;
  max-height: 0;
  margin-top: 0;

  transition: 250ms ease;

  &.visible {
    opacity: 1;
    max-height: 60px;
    margin-top: 20px;
  }
`;

const DayWrapper = styled.span`
  position: relative;
`;

const DotReminder = styled.span`
  position: absolute;
  bottom: 9px;
  width: 40px;
  height: 2px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: ${tokens.colors.primaryDark1};
  pointer-events: none;
  transition: 100ms ease-in;
  opacity: 0;

  &.visible {
    opacity: 1;
  }
`;

const Day = styled.div`
  cursor: pointer;
  min-width: 40px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin-bottom: 8px;
  padding: 8px 0;

  border: 1px solid ${tokens.colors.lightGrey};
  border-left: 0;
  border-right: 0;

  color: ${(props) =>
    !props.today
      ? `${tokens.colors.primaryDark3}`
      : `${tokens.colors.primary}`};
  background: ${(props) =>
    props.weekend ? `${tokens.colors.lightGrey}` : 'none'};
  scroll-snap-align: start;
  gap: 8px;
  /* transition: 250ms ease; */

  &.today {
    color: ${tokens.colors.fff};
    background: ${tokens.colors.primaryLight2};
    scroll-snap-align: start;
  }

  &.today.h,
  &.today.Mo {
    color: ${tokens.colors.fff};
    background: ${tokens.colors.primaryLight2};
    scroll-snap-align: start;
    border-radius: 4px 0 0 4px;
  }

  &.today.v,
  &.today.Su {
    color: ${tokens.colors.fff};
    background: ${tokens.colors.primaryLight2};
    scroll-snap-align: start;
    border-radius: 0 4px 4px 0;
  }

  &.h,
  &.Mo {
    border: 1px solid ${tokens.colors.lightGrey};
    border-right: 0;
    border-radius: 4px 0 0 4px;
  }

  &.v,
  &.Su {
    border: 1px solid ${tokens.colors.lightGrey};
    border-left: 0;
    border-radius: 0 4px 4px 0;
    margin-right: 5px;
  }
`;

const CloseBar = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  padding: ${(props) => (props.visible ? '10px 0 0 0' : '0')};
  transition: 100ms ease;
`;

const IconWrapper = styled.div`
  transition: 250ms ease;
  transform: rotate(180deg);

  &.visible {
    transform: rotate(0deg);
  }
`;

const ArrowWrapper = styled.span`
  cursor: pointer;
  display: flex;
  align-items: center;
  visibility: ${(props) => (props.visible ? 'visible' : 'hidden')};
`;

export default Calendar;

// Prop types
Calendar.propTypes = {
  documents: PropTypes.array,
  selectedDate: PropTypes.object,
  setSelectedDate: PropTypes.func,
};
