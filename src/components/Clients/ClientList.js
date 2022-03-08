import React, { useState } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { useTranslation } from 'react-i18next';
import { tokens } from '../UI/tokens';

// project components
import Input from '../UI/Input';
import Text from '../UI/Text';
import Client from './Client';
import SearchIcon from '../icons/SearchIcon';
import MarkIcon from '../icons/MarkIcon';
import FlexCenter from '../UI/FlexCenter';

function ClientList({ clients }) {
  const [value, setValue] = useState('');
  const [filter, setFilter] = useState('');
  const [marked, setMarked] = useState(false);

  const { t } = useTranslation();

  const filterOptions = [
    { name: t('client.all'), value: '', onClick: () => setFilter('') },
    {
      name: t('client.male'),
      value: 'male',
      onClick: () => setFilter('male'),
    },
    {
      name: t('client.female'),
      value: 'female',
      onClick: () => setFilter('female'),
    },
    {
      name: (
        <FlexCenter style={{ marginLeft: '10px', gap: '2px' }}>
          <MarkIcon
            color={marked ? tokens.colors.warning : tokens.colors.darkGrey}
            size={16}
          />
          <Text
            tag="div"
            variant="medium14"
            color={marked ? tokens.colors.warning : tokens.colors.darkGrey}
          >
            {t('client.marked')}
          </Text>
        </FlexCenter>
      ),
      value: 'marked',
      onClick: () => setMarked(!marked),
    },
  ];

  if (!clients) {
    return null;
  }

  const primary = tokens.colors.primary;
  const primaryLighter = tokens.colors.primaryLight1;

  const isSame = (a, b) => {
    if (a.value === b) return true;
  };

  return (
    <ClientListWrapper>
      {clients.length !== 0 && (
        <>
          <FilterMenu>
            <Text
              tag="span"
              variant="black14"
              color={tokens.colors.primaryDark4}
            >
              {t('client.show')}:
            </Text>

            {filterOptions.map((option) => (
              <Text
                tag="div"
                key={option.value}
                onClick={option.onClick}
                variant={isSame(option, filter) ? 'black14' : 'regular14'}
                color={isSame(option, filter) ? primary : primaryLighter}
              >
                {option.name}
              </Text>
            ))}
          </FilterMenu>

          <Input
            type="text"
            placeholder={t('input.placeholder.client_search')}
            value={value}
            onChange={(e) => setValue(e.target.value)}
            icon={<SearchIcon color={tokens.colors.primaryLight1} />}
            handleClear={() => setValue('')}
            clearable
          />
        </>
      )}

      {clients.length ? (
        clients
          .filter((item) => {
            if (!filter) return true;
            return item.gender === filter;
          })
          .filter((item) => {
            if (!marked) return true;
            return item.elite === marked;
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
        <WarningWrapper>
          <Text variant="regular14" color={tokens.colors.primaryLight3}>
            {t('warning.no_clients')}
          </Text>
        </WarningWrapper>
      )}
    </ClientListWrapper>
  );
}

// styled components
const ClientListWrapper = styled.div`
  margin: 0 10px;
`;

const WarningWrapper = styled.div`
  text-align: center;
`;

const FilterMenu = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 10px;
  gap: 10px;
  padding: 10px;
  border: 1px solid ${tokens.colors.primaryLight4};
  background: ${tokens.colors.fff};
  border-radius: 4px;

  span {
    margin-right: 6px;
  }
`;

export default ClientList;

// Prop types
ClientList.propTypes = {
  clients: PropTypes.array,
};
