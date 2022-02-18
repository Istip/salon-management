import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import { tokens } from '../UI/tokens';

// Project imports
import CalendarIcon from '../icons/CalendarIcon';
import ViewAllIcon from '../icons/ViewAllIcon';
import ViewHoursIcon from '../icons/ViewHoursIcon';
import FlexCenter from '../UI/FlexCenter';
import Text from '../UI/Text';
import { useTranslation } from 'react-i18next';
import { capitalize } from '../../utils/capitalize';

const EventsFilter = ({ active, setActive, setWorkingHours }) => {
  const { t } = useTranslation();

  // Filter button selecting
  const viewAll = () => {
    if (active !== 'all') {
      setActive('all');
      setWorkingHours([0, 48]);
    }
  };

  const viewFiltered = () => {
    if (active !== 'filtered') {
      setActive('filtered');
      setWorkingHours([0, 48]);
    }
  };

  const viewWorkingHours = () => {
    if (active !== 'working-hours') {
      setActive('working-hours');
      setWorkingHours([16, 37]);
    }
  };

  return (
    <Wrapper>
      <FilterMenuWrapper>
        <FilterItem active={active === 'all'} onClick={viewAll}>
          <FlexCenter style={{ gap: '2px' }}>
            <CalendarIcon
              color={
                active === 'all'
                  ? tokens.colors.fff
                  : tokens.colors.primaryDark3
              }
            />
            <Text
              variant={active === 'all' ? 'black10' : 'regular10'}
              color={
                active === 'all'
                  ? tokens.colors.fff
                  : tokens.colors.primaryDark3
              }
            >
              {capitalize(t(`dashboard.filter.all`))}
            </Text>
          </FlexCenter>
        </FilterItem>

        <FilterItem active={active === 'filtered'} onClick={viewFiltered}>
          <FlexCenter style={{ gap: '2px' }}>
            <ViewAllIcon
              color={
                active === 'filtered'
                  ? tokens.colors.fff
                  : tokens.colors.primaryDark3
              }
            />
            <Text
              variant={active === 'filtered' ? 'black10' : 'regular10'}
              color={
                active === 'filtered'
                  ? tokens.colors.fff
                  : tokens.colors.primaryDark3
              }
            >
              {capitalize(t(`dashboard.filter.filtered`))}
            </Text>
          </FlexCenter>
        </FilterItem>

        <FilterItem
          active={active === 'working-hours'}
          onClick={viewWorkingHours}
        >
          <FlexCenter style={{ gap: '2px' }}>
            <ViewHoursIcon
              color={
                active === 'working-hours'
                  ? tokens.colors.fff
                  : tokens.colors.primaryDark3
              }
            />
            <Text
              variant={active === 'working-hours' ? 'black10' : 'regular10'}
              color={
                active === 'working-hours'
                  ? tokens.colors.fff
                  : tokens.colors.primaryDark3
              }
            >
              {capitalize(t(`dashboard.filter.working-hours`))}
            </Text>
          </FlexCenter>
        </FilterItem>
      </FilterMenuWrapper>
    </Wrapper>
  );
};

// Styled components

const Wrapper = styled.div`
  margin: 0 10px 20px 20px;
  width: auto;
`;

const FilterMenuWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
`;

const FilterItem = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  background: ${(props) =>
    props.active
      ? `${tokens.colors.primaryLight2}`
      : `${tokens.colors.primaryLight4}`};
  padding: 6px;
  cursor: pointer;
  transition: 250ms ease;
  border-top: 1px solid ${tokens.colors.primaryLight1};
  border-bottom: 1px solid ${tokens.colors.primaryLight1};

  &:first-child {
    border-left: 1px solid ${tokens.colors.primaryLight1};
    border-top-left-radius: 4px;
    border-bottom-left-radius: 4px;
  }

  &:last-child {
    border-right: 1px solid ${tokens.colors.primaryLight1};
    border-top-right-radius: 4px;
    border-bottom-right-radius: 4px;
  }

  &:hover {
    background: ${tokens.colors.primaryLight1};
  }
`;

export default EventsFilter;

// Prop types
EventsFilter.propTypes = {
  active: PropTypes.string.isRequired,
  setActive: PropTypes.func.isRequired,
  setWorkingHours: PropTypes.func.isRequired,
};
