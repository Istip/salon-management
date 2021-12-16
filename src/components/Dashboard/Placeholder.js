import React, { useState } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { tokens } from '../UI/tokens';

// Project imports
import Text from '../UI/Text';
import AddIcon from '../icons/AddIcon';
import FlexCenter from '../UI/FlexCenter';

const Placeholder = ({ event, setTime, setShowAdd }) => {
  const [visible, setVisible] = useState(false);

  // Function to save time to state and open the modal
  const handleModalOpen = () => {
    setTime(event);
    setShowAdd(true);
  };

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
        <PlaceholderCard
          onClick={handleModalOpen}
          onMouseEnter={() => setVisible(true)}
          onMouseLeave={() => setVisible(false)}
        >
          <FlexCenter style={{ gap: '4px' }}>
            <AddIcon color={tokens.colors.primaryLight2} />
            <HiddenTime className={visible ? 'visible' : ''}>
              <Text variant="regular14" color={tokens.colors.primaryLight2}>
                {event}
              </Text>
            </HiddenTime>
          </FlexCenter>
        </PlaceholderCard>
      </PlaceholderInfo>
    </PlaceholderWrapper>
  );
};

// Styled components
const PlaceholderWrapper = styled.div`
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
  border: 1px dashed ${tokens.colors.primaryLight3};
  border-left: 3px solid ${tokens.colors.primaryLight3};
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

const HiddenTime = styled.div`
  max-width: 0;
  overflow: hidden;
  transition: 250ms ease;

  /* monospace the numbers */
  font-feature-settings: 'tnum' on, 'lnum' on;

  &.visible {
    max-width: 40px;
  }
`;

export default Placeholder;

// Prop types

Placeholder.propTypes = {
  event: PropTypes.oneOfType([PropTypes.object, PropTypes.string]),
  setTime: PropTypes.func.isRequired,
  setShowAdd: PropTypes.func.isRequired,
};
