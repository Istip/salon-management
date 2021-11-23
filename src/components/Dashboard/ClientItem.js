import React from 'react';
import styled from 'styled-components';

import { tokens } from '../UI/tokens';
import FlexCenter from '../UI/FlexCenter';

const ClientItem = ({ item }) => {
  return (
    <ClientItemWrapper>
      <ClientInfo>
        <ClientTime>{item}</ClientTime>
        <ClientCard>
          <FlexCenter>
            <b>HELLO</b>
          </FlexCenter>
        </ClientCard>
      </ClientInfo>
    </ClientItemWrapper>
  );
};

// styled components
const ClientItemWrapper = styled.div``;

const ClientInfo = styled.div`
  width: 100%;
  display: flex;
`;

const ClientTime = styled.span`
  min-width: 50px;
  max-width: 50px;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 10px;
  font-weight: 900;
  font-size: 10px;
  color: ${tokens.colors.primaryDark2};
`;

const ClientCard = styled.div`
  width: 100%;
  border: 1px dashed ${tokens.colors.primary};
  border-radius: 4px;
  margin: 5px;
  padding: 10px 20px;
  color: ${tokens.colors.primaryLight3};
`;

export default ClientItem;
