import moment from 'moment';
import React, { useEffect, useRef, useState } from 'react';
import styled from 'styled-components';

// project imports
import ArrowLeftIcon from '../icons/ArrowLeftIcon';
import ArrowRightIcon from '../icons/ArrowRightIcon';
import Text from '../../components/UI/Text';
import { tokens } from '../UI/tokens';

const Calendar = () => {
  const [date, setDate] = useState(moment());
  const [selectedDate, setSelectedDate] = useState(
    moment().subtract(11, 'days')
  );

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

  const daysOfMonth = getDaysOfTheMonth();

  const dayRef = useRef();

  const handleCurrentDay = (format) => {
    return parseInt(moment(selectedDate).format(format));
  };

  useEffect(() => {
    dayRef.current.children[handleCurrentDay('DD')].scrollIntoView({
      behavior: 'smooth',
      block: 'center',
      inline: 'center',
    });
    // eslint-disable-next-line
  }, [selectedDate]);

  return (
    <CalendarWrapper>
      <MonthSelector>
        <ArrowWrapper onClick={minusMonth}>
          <ArrowLeftIcon color={tokens.colors.primaryDark3} />
        </ArrowWrapper>

        <Text variant="black12" color={tokens.colors.primaryDark3}>
          {date.format('MMMM, YYYY')}
        </Text>

        <ArrowWrapper onClick={plusMonth}>
          <ArrowRightIcon color={tokens.colors.primaryDark3} />
        </ArrowWrapper>
      </MonthSelector>

      <DaySelector>
        <DaySelectorWrapper ref={dayRef}>
          {daysOfMonth.map((day) => (
            <Day
              key={day.format('DD')}
              onClick={() => setSelectedDate(day)}
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
          ))}
        </DaySelectorWrapper>
      </DaySelector>
    </CalendarWrapper>
  );
};

// styled components
const CalendarWrapper = styled.div`
  background: #fff;
  box-shadow: 0px 4px 20px -8px rgba(14, 44, 77, 0.15);
  margin-bottom: 20px;
`;

const MonthSelector = styled.div`
  width: 100%;
  padding: 20px;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const DaySelector = styled.div`
  overflow-x: auto;
  -ms-overflow-style: none; /* IE and Edge */
  scrollbar-width: none; /* Firefox */
  scroll-snap-align: end;

  &::-webkit-scrollbar {
    display: none;
  }
`;

const DaySelectorWrapper = styled.div`
  display: flex;
  gap: 10px;
  scroll-snap-type: y mandatory;
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
  gap: 10px;

  &.today {
    color: #fff;
    background: ${tokens.colors.primaryLight2};
    scroll-snap-align: start;
  }
`;

const ArrowWrapper = styled.span`
  cursor: pointer;
  display: flex;
  align-items: center;
`;

export default Calendar;
