import React, { useState } from 'react';
import styled from 'styled-components';
import { tokens } from '../UI/tokens';

// project components
import Input from '../UI/Input';
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
        placeholder="Search clients..."
        value={value}
        onChange={(e) => setValue(e.target.value)}
        handleClear={() => setValue('')}
        icon={<SearchIcon color={tokens.colors.primaryLight1} />}
      />

      {clients.length
        ? clients
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
        : 'No clients found...'}
    </ClientListWraper>
  );
};

const ClientListWraper = styled.div`
  margin: 0 10px;
`;

export default ClientList;
