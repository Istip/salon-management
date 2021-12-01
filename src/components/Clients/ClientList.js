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
  const [filter, setFilter] = useState('');

  const filterOptions = [
    { name: 'All', value: '', onClick: () => setFilter('') },
    { name: 'Male', value: 'male', onClick: () => setFilter('male') },
    { name: 'Female', value: 'female', onClick: () => setFilter('female') },
  ];

  if (!clients) {
    return null;
  }

  const primary = tokens.colors.primary;
  const grey = tokens.colors.mediumGrey;

  const isSame = (a, b) => {
    if (a.value === b) return true;
  };

  return (
    <ClientListWraper>
      <FilterMenu>
        <Text tag="span" variant="black14" color={tokens.colors.primaryDark4}>
          Show:
        </Text>

        {filterOptions.map((option) => (
          <Text
            key={option.value}
            onClick={option.onClick}
            variant={isSame(option, filter) ? 'medium14' : 'regular14'}
            color={isSame(option, filter) ? primary : grey}
          >
            {option.name}
          </Text>
        ))}
      </FilterMenu>

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
            if (!filter) return true;
            return item.gender === filter;
          })
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

const FilterMenu = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 10px;
  gap: 10px;

  span {
    margin-right: 6px;
  }
`;

export default ClientList;
