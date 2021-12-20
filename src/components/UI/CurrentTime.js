import React, { useState, useEffect } from 'react';
import moment from 'moment';
import styled from 'styled-components';
import { tokens } from './tokens';

// Project imports
import Text from './Text';

const CurrentTime = () => {
  const [time, setTime] = useState(moment());

  useEffect(() => {
    const intervalID = setTimeout(() => {
      setTime(moment());
    }, 60000);

    return () => clearInterval(intervalID);
  }, [time]);

  return (
    <Line>
      <TimeBadge>
        <Text variant="black10" color={tokens.colors.fff}>
          {time.format('HH:mm')}
        </Text>
      </TimeBadge>
    </Line>
  );
};

const Line = styled.div`
  width: 100%;
  border-top: 1px solid ${tokens.colors.primaryDark3};
  position: relative;
`;

const TimeBadge = styled.div`
  position: absolute;
  top: -10px;
  left: 15px;
  padding: 4px 8px;
  text-align: center;
  background: ${tokens.colors.primaryDark3};
  border-radius: 10px;
`;

export default CurrentTime;
