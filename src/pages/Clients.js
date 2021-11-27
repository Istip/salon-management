import React, { useState } from 'react';
import Button from '../components/UI/Button';
import Modal from '../components/UI/Modal';

const Clients = () => {
  const [show, setShow] = useState(false);

  return (
    <div>
      <br />
      <br />
      <br />
      <br />
      <h1>Clients</h1>
      <br />
      <Button onClick={() => setShow(!show)}>Open modal</Button>

      <Modal show={show} setShow={setShow} title="Add new Client">
        <h1>Hellokana!</h1>
      </Modal>
    </div>
  );
};

export default Clients;
