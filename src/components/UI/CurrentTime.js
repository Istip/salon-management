import moment from 'moment';
import React from 'react';
import styled from 'styled-components';
import { tokens } from './tokens';

// Project imports
import Text from './Text';

const CurrentTime = () => {
  return (
    <Line>
      <TimeBadge>
        <Text variant="black10" color={tokens.colors.fff}>
          {moment().format('HH:mm')}
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
