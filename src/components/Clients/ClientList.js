import React, { useState } from 'react';
import styled from 'styled-components';
import { tokens } from '../UI/tokens';

// project components
import Input from '../UI/Input';
import Text from '../UI/Text';
import Client from './Client';
import SearchIcon from '../icons/SearchIcon';

const ClientList = ({ clients }) => {
  const [value, setValue] = useState('');

  if (!clients) {
    return null;
  }

  return (
    <ClientListWraper>
      <Input
        type="text"
        placeholder="Search client name or phone..."
        value={value}
        onChange={(e) => setValue(e.target.value)}
        icon={<SearchIcon color={tokens.colors.primaryLight1} />}
        handleClear={() => setValue('')}
        clearable
      />

      {clients.length ? (
        clients
          .filter((item) => {
            if (!value) return true;
            if (
              item.name.toLowerCase().includes(value.toLowerCase()) ||
              item.phone.includes(value)
            ) {
              return true;
            }
            return null;
          })
          .map((client) => <Client key={client.id} client={client} />)
      ) : (
        <NoClients>
          <Text variant="regular14" color={tokens.colors.primaryLight3}>
            Add clients to your list...
          </Text>
        </NoClients>
      )}
    </ClientListWraper>
  );
};

// styled components
const ClientListWraper = styled.div`
  margin: 0 10px;
`;

const NoClients = styled.div`
  text-align: center;
`;

export default ClientList;
