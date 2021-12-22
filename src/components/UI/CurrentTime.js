import React, { useEffect, useState } from 'react';
import moment from 'moment';
import styled from 'styled-components';
import { tokens } from './tokens';

// Project imports
import Text from './Text';

const CurrentTime = () => {
  const [time, setTime] = useState(moment());

  // Side effect for clock ticking
  useEffect(() => {
    const intervalID = setTimeout(() => {
      setTime(moment());
    }, 1000);

    return () => clearInterval(intervalID);
    // eslint-disable-next-line
  }, [time]);

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

// styled components
const Line = styled.div`
  width: 100%;
  border-top: 1px solid ${tokens.colors.success};
  position: relative;
  z-index: 1;
`;

const TimeBadge = styled.div`
  position: absolute;
  top: -10px;
  left: calc(50% - 4px);
  padding: 4px 8px;
  text-align: center;
  background: ${tokens.colors.success};
  border-radius: 10px;
  font-feature-settings: 'tnum' on, 'lnum' on;
`;

export default CurrentTime;
