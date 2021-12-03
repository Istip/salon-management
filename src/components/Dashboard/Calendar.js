import moment from 'moment';
import React, { useState } from 'react';
import styled from 'styled-components';
import { tokens } from '../UI/tokens';

// project components
import ArrowLeftIcon from '../icons/ArrowLeftIcon';
import ArrowRightIcon from '../icons/ArrowRightIcon';
import DirectionIcon from '../icons/DirectionIcon';
import TimeIcon from '../icons/TimeIcon';
import Text from '../../components/UI/Text';
import Button from '../../components/UI/Button';
import FlexCenter from '../../components/UI/FlexCenter';

const Calendar = ({ selectedDate, setSelectedDate, documents }) => {
  const [date, setDate] = useState(moment());
  const [visible, setVisible] = useState(true);

  //❌❌❌❌❌❌❌❌❌
  console.log(documents);

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

  const todayIsSelected = () => {
    const today = moment().format('YY-MM-DD');
    const selected = selectedDate.format('YY-MM-DD');
    if (today !== selected) {
      return true;
    }
  };

  const handleResetDate = () => {
    if (todayIsSelected()) {
      setSelectedDate(moment());
      setDate(moment());
    }
  };

  const daysOfMonth = getDaysOfTheMonth();

  // TODO: scroll into center, but somehow last day of the month
  // ...always creates an error... Find out why and put scroll into view back
  // When fixed, put back 'selectedDate' as a side effect dependency
  // date dependency is currently added so if we journey through years and months
  // ... when we finally come back to the last selected date, we get scrolled
  // ... into the center of the view

  return (
    <CalendarWrapper>
      <MonthSelector visible={visible}>
        <ArrowWrapper onClick={minusMonth} visible={visible}>
          <ArrowLeftIcon color={tokens.colors.primaryDark3} />
        </ArrowWrapper>

        <FlexCenter style={{ gap: '10px' }}>
          <Text variant="black12" color={tokens.colors.primaryDark3}>
            {visible
              ? date.format('YYYY MMMM')
              : selectedDate.format('YYYY MMMM DD')}
          </Text>

          {todayIsSelected() && (
            <Button
              variant="neutral"
              size="small"
              onClick={() => handleResetDate()}
              title={`Jump back to ${moment().format('YYYY-MM-DD')}`}
            >
              <TimeIcon size={12} />
            </Button>
          )}
        </FlexCenter>

        <ArrowWrapper onClick={plusMonth} visible={visible}>
          <ArrowRightIcon color={tokens.colors.primaryDark3} />
        </ArrowWrapper>
      </MonthSelector>

      <DaySelector>
        <DaySelectorWrapper className={visible ? 'visible' : ''}>
          {daysOfMonth.map((day) => (
            <DayWrapper
              key={day.format('DD')}
              onClick={() => setSelectedDate(day)}
            >
              <Day
                className={
                  day.format('YY-MM-DD') === selectedDate.format('YY-MM-DD')
                    ? 'today'
                    : ''
                }
                weekend={day.format('dd') === 'Sa' || day.format('dd') === 'Su'}
              >
                <Text variant="medium8" tag="div">
                  {day.format('ddd')}
                </Text>
                <Text variant="black12" tag="div">
                  {day.format('DD')}
                </Text>
              </Day>

              <DotReminder>
                {documents &&
                documents.some(
                  (item) =>
                    moment(item.date.seconds * 1000).format('YY-MM-DD') ===
                    moment(day).format('YY-MM-DD')
                )
                  ? '•'
                  : ''}
              </DotReminder>
            </DayWrapper>
          ))}
        </DaySelectorWrapper>
      </DaySelector>

      <CloseBar onClick={() => setVisible(!visible)} visible={visible}>
        <IconWrapper className={!visible ? 'visible' : ''}>
          <DirectionIcon />
        </IconWrapper>
      </CloseBar>
    </CalendarWrapper>
  );
};

// styled components
const CalendarWrapper = styled.div`
  background: #fff;
  box-shadow: 0px 4px 20px -8px rgba(14, 44, 77, 0.15);
  margin-bottom: 20px;
  transition: 500ms ease;

  &:hover {
    box-shadow: 0px 8px 20px -4px rgba(14, 44, 77, 0.2);
  }
`;

const MonthSelector = styled.div`
  width: 100%;
  padding: ${(props) => (props.visible ? '20px' : '10px 20px 0 20px')};
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
  gap: 10px;
  scroll-snap-type: y mandatory;
  opacity: 0;
  max-height: 0;

  transition: 250ms ease;

  &.visible {
    opacity: 1;
    max-height: 60px;
  }
`;

const DayWrapper = styled.span`
  position: relative;
`;

const DotReminder = styled.span`
  position: absolute;
  bottom: 11px;
  width: 40px;
  height: 2px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: ${tokens.colors.warning};
  pointer-events: none;
`;

const Day = styled.div`
  cursor: pointer;
  min-width: 40px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin-bottom: 14px;
  padding: 8px 0;
  border-radius: 4px;
  color: ${tokens.colors.primaryDark3};
  background: ${(props) =>
    props.weekend ? `${tokens.colors.lightGrey}` : 'none'};
  scroll-snap-align: start;
  gap: 8px;
  transition: 250ms ease;

  &.today {
    color: #fff;
    background: ${tokens.colors.primaryLight2};
    scroll-snap-align: start;
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

  &.visible {
    transform: rotate(180deg);
  }
`;

const ArrowWrapper = styled.span`
  cursor: pointer;
  display: flex;
  align-items: center;
  visibility: ${(props) => (props.visible ? 'visible' : 'hidden')};
`;

export default Calendar;
