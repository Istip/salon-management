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
    <FilterMenuWrapper>
      <FlexCenter style={{ gap: '5px' }}>
        <FilterItem active={active === 'all'} onClick={() => viewAll()}>
          <FlexCenter>
            <CalendarIcon color={tokens.colors.primaryDark3} />
          </FlexCenter>
        </FilterItem>

        <FilterItem
          active={active === 'filtered'}
          onClick={() => viewFiltered()}
        >
          <FlexCenter>
            <ViewAllIcon color={tokens.colors.primaryDark3} />
          </FlexCenter>
        </FilterItem>

        <FilterItem
          active={active === 'working-hours'}
          onClick={() => viewWorkingHours()}
        >
          <FlexCenter>
            <ViewHoursIcon color={tokens.colors.primaryDark3} />
          </FlexCenter>
        </FilterItem>
      </FlexCenter>

      <Text tag="span" variant="medium10" color={tokens.colors.primaryDark1}>
        {t('dashboard.filter_by')}: {t(`dashboard.filter.${active}`)}
      </Text>
    </FilterMenuWrapper>
  );
};

// Styled components
const FilterMenuWrapper = styled.div`
  position: relative;
  display: flex;
  align-items: flex-end;
  justify-content: center;
  flex-direction: column;
  gap: 5px;
  background: ${tokens.colors.primaryLight4};
  border-radius: 4px;
  border: 1px solid ${tokens.colors.primaryLight3};
  display: flex;
  align-items: center;
  justify-content: center;

  padding: 6px;
  gap: 6px;
`;

const FilterItem = styled.span`
  position: relative;
  background: ${(props) =>
    props.active
      ? `${tokens.colors.primaryLight3}`
      : `${tokens.colors.primaryLight4}`};
  padding: 6px;
  border-radius: 4px;
  cursor: pointer;
  transition: 250ms ease;

  &:hover {
    background: ${tokens.colors.primaryLight3};
  }
`;

export default EventsFilter;

// Prop types

EventsFilter.propTypes = {
  active: PropTypes.string.isRequired,
  setActive: PropTypes.func.isRequired,
  setWorkingHours: PropTypes.func.isRequired,
};
