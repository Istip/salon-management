import React from 'react';
import styled, { keyframes } from 'styled-components';
import { tokens } from '../UI/tokens';
import { useFirestore } from '../../hooks/useFirestore';

// project components
import PhoneIcon from '../icons/PhoneIcon';
import StarIcon from '../icons/StarIcon';
import UserMinusIcon from '../icons/UserMinusIcon';
import Button from '../UI/Button';

const ClientPopover = ({ visible, client }) => {
  const { deleteDocument, updateDocument } = useFirestore('clients');

  return (
    <>
      {visible && (
        <>
          <Popover>
            <Button
              variant="error"
              icon={<UserMinusIcon color={tokens.colors.error} size={18} />}
              onClick={() => deleteDocument(client.id)}
            >
              Delete
            </Button>

            <Button
              variant="warning"
              icon={<StarIcon color={tokens.colors.warning} size={18} />}
              onClick={() =>
                updateDocument(client.id, { ...client, elite: !client.elite })
              }
            />

            <a href={`tel:${client.phone}`}>
              <Button
                variant="success"
                icon={<PhoneIcon color={tokens.colors.success} size={18} />}
              />
            </a>
          </Popover>
        </>
      )}
    </>
  );
};

// styled components
const fadeIn = keyframes`
   0% {
    opacity: 0;
    transform: scale(0.1);
  }

  30% {
    opacity: 0.7;
    transform: scale(1.15);
  }
  
   100% {
    opacity: 1;
    transform: scale(1);
  }
`;

const Popover = styled.div`
  background: #fff;
  border-radius: 4px;
  border: 1px solid ${tokens.colors.primaryLight3};
  position: absolute;
  right: 0px;
  top: 20px;
  box-shadow: 0 2px 10px rgba(42, 129, 227, 0.2);
  animation: ${fadeIn} 400ms ease;
  user-select: none;
  padding: 10px;

  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;

  small {
    position: absolute;
  }
`;

export default ClientPopover;
