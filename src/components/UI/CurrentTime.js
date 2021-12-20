import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { tokens } from './tokens';

// Project imports
import Text from './Text';

const CurrentTime = ({ time }) => {
  return (
    <Line>
      <TimeBadge>
        <Text variant="black10" color={tokens.colors.fff}>
          {time.format('HH:mm:ss')}
        </Text>
      </TimeBadge>
    </Line>
  );
};

CurrentTime.propTypes = {
  time: PropTypes.object.isRequired,
};

const Line = styled.div`
  width: 100%;
  border-top: 1px solid ${tokens.colors.warning};
  position: relative;
  z-index: 1;
`;

const TimeBadge = styled.div`
  position: absolute;
  top: -10px;
  left: calc(50% - 4px);
  padding: 4px 8px;
  text-align: center;
  background: ${tokens.colors.warning};
  border-radius: 10px;
  font-feature-settings: 'tnum' on, 'lnum' on;
`;

export default CurrentTime;
