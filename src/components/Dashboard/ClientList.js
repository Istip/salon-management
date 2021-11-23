import React from 'react';
import { times } from '../../utils/times';
import ClientItem from './ClientItem';

const ClientList = ({ item }) => {
  return (
    <div>
      {times.map((item) => (
        <ClientItem key={item} item={item} />
      ))}
    </div>
  );
};

export default ClientList;
