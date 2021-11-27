import React from 'react';
import styled from 'styled-components';
import Client from './Client';

const ClientList = ({ clients }) => {
  if (!clients) {
    return null;
  }

  return (
    <ClientListWraper>
      {clients.map((client) => (
        <Client key={client.id} client={client} />
      ))}
    </ClientListWraper>
  );
};

const ClientListWraper = styled.div`
  margin: 0 10px;
`;

export default ClientList;
