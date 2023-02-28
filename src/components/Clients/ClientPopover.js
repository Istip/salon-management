import React from "react";
import PropTypes from "prop-types";
import styled, { keyframes } from "styled-components";
import { useFirestore } from "../../hooks/useFirestore";
import { useTranslation } from "react-i18next";
import { tokens } from "../UI/tokens";

// project components
import PhoneIcon from "../icons/PhoneIcon";
import MarkIcon from "../icons/MarkIcon";
import UserMinusIcon from "../icons/UserMinusIcon";
import Button from "../UI/Button";

const ClientPopover = ({ visible, client }) => {
  const { deleteDocument, updateDocument } = useFirestore("clients");

  const { t } = useTranslation();

  // Function to remove the selected client
  const deleteClient = (id) => {
    deleteDocument(id);
    // navigator.vibrate(100);
  };

  if (!visible) {
    return null;
  }

  return (
    <Popover>
      <Button
        variant="error"
        icon={<UserMinusIcon color={tokens.colors.error} size={18} />}
        onClick={() => deleteClient(client.id)}
      >
        {t("client.delete")}
      </Button>

      <Button
        variant="warning"
        icon={<MarkIcon color={tokens.colors.warning} size={18} />}
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
  background: ${tokens.colors.fff};
  border-radius: 4px;
  border: 1px solid ${tokens.colors.primaryLight3};
  position: absolute;
  right: 0px;
  top: 30px;
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

// Prop types
ClientPopover.propTypes = {
  client: PropTypes.shape({
    elite: PropTypes.bool,
    gender: PropTypes.oneOf(["male", "female"]),
    id: PropTypes.string,
    name: PropTypes.string,
    phone: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  }),
  visible: PropTypes.bool,
};
