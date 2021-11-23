import React from 'react';
import ClientItem from './ClientItem';

const ClientList = () => {
  return (
    <div>
      {[1, 2, 3].map((item) => (
        <ClientItem key={item} />
      ))}
    </div>
  );
};

export default ClientList;
