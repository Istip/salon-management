import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { tokens } from '../UI/tokens';

// Project imports
import Text from '../UI/Text';
import AddIcon from '../icons/AddIcon';
import FlexCenter from '../UI/FlexCenter';
import moment from 'moment';

const Placeholder = ({
  event,
  setTime,
  setShowAdd,
  filtered,
  selectedDate,
}) => {
  const isActiveDay = selectedDate.isSameOrAfter(moment(), 'day');

  // Function to save time to state and open the modal
  const handleModalOpen = () => {
    if (isActiveDay) {
      setTime(event);
      setShowAdd(true);
    }
  };

  if (!filtered) {
    return null;
  }

  return (
    <PlaceholderWrapper>
      <PlaceholderInfo>
        <PlaceholderTime>
          <Text
            tag="div"
            variant="medium10"
            color={tokens.colors.primaryLight2}
          >
            {event}
          </Text>
        </PlaceholderTime>
        <PlaceholderCard onClick={handleModalOpen} active={isActiveDay}>
          <FlexCenter style={{ gap: '4px' }}>
            <AddIcon color={tokens.colors.primaryLight2} />
          </FlexCenter>
        </PlaceholderCard>
      </PlaceholderInfo>
    </PlaceholderWrapper>
  );
};

// Styled components
const PlaceholderWrapper = styled.div`
  position: relative;
  margin: 0 10px;
`;

const PlaceholderInfo = styled.div`
  width: 100%;
  display: flex;
  min-height: 60px;
  margin: 5px 0;
`;

const PlaceholderTime = styled.div`
  position: relative;
  min-width: 50px;
  max-width: 50px;
  display: flex;
  justify-content: center;
  padding: 10px;

  /* monospace the numbers */
  font-feature-settings: 'tnum' on, 'lnum' on;
`;

const PlaceholderCard = styled.div`
  width: 100%;
  height: 70px;
  border-radius: 0 12px 12px 0;
  border: 1px dashed ${tokens.colors.mediumGrey};
  border-left: 3px solid ${tokens.colors.mediumGrey};
  pointer-events: ${(props) => (props.active ? 'auto' : 'none')};
  cursor: pointer;

  display: flex;
  align-items: center;
  justify-content: center;

  background-image: linear-gradient(
    45deg,
    #ffffff 25%,
    #fafcfe 25%,
    #fafcfe 50%,
    #ffffff 50%,
    #ffffff 75%,
    #fafcfe 75%,
    #fafcfe 100%
  );
  background-size: 30px 30px;
  opacity: 0.75;
  transition: 250ms ease;

  &:hover {
    box-shadow: 0 0 10px 0 rgba(14, 44, 77, 0.15);
    opacity: 1;
  }
`;

export default Placeholder;

// Prop types

Placeholder.propTypes = {
  filtered: PropTypes.bool.isRequired,
  event: PropTypes.oneOfType([PropTypes.object, PropTypes.string]),
  setTime: PropTypes.func.isRequired,
  setShowAdd: PropTypes.func.isRequired,
};
