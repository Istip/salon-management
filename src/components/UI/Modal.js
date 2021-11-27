import React from 'react';
import styled from 'styled-components';
import { tokens } from './tokens';

// project components
import Text from '../UI/Text';
import Button from './Button';

const Modal = ({ show, setShow, title, ...props }) => {
  const closeModal = () => {
    setShow(false);
  };

  if (!show) {
    return null;
  }

  return (
    <ModalWrapper>
      <Backdrop onClick={closeModal} />

      <ModalContent>
        <Close onClick={closeModal}>✖</Close>

        <Header>
          <Text variant="black14" color={tokens.colors.primaryDark3}>
            {title}
          </Text>
        </Header>
        {props.children && <Body>{props.children}</Body>}
        <Footer>
          <Button block variant="neutral">
            Cancel
          </Button>
          <Button block>Submit</Button>
        </Footer>
      </ModalContent>
    </ModalWrapper>
  );
};

// styled components
const ModalContent = styled.div`
  position: absolute;
  max-width: 350px;
  background: #fff;
  border: 1px solid ${tokens.colors.primaryLight3};
  border-radius: 4px;
`;

const Header = styled.div`
  padding: 18px;
  text-align: center;
`;

const Close = styled.div`
  color: ${tokens.colors.primaryLight3};
  position: absolute;
  left: auto;
  top: 0;
  right: 6px;
  padding: 6px;
`;

const Body = styled.div`
  padding: 10px;
  border-top: 1px solid ${tokens.colors.lightGrey};
`;

const Footer = styled.div`
  padding: 18px;
  display: flex;
  gap: 10px;
`;

const ModalWrapper = styled.div`
  position: fixed;
  top: 0;
  z-index: 10;
  width: 100vw;
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  border: 1px solid red;
`;

const Backdrop = styled.div`
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  background: ${tokens.colors.primaryDark3};
  opacity: 0.5;
`;

export default Modal;
