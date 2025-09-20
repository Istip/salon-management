import PropTypes from "prop-types";
import React, { useEffect } from "react";
import styled from "styled-components";
import { useTranslation } from "react-i18next";
import { tokens } from "./tokens";

// project components
import Text from "../UI/Text";
import Button from "./Button";
import CloseIcon from "../icons/CloseIcon";

const Modal = ({
  show,
  setShow,
  title,
  onSubmit,
  onCancel,
  variant,
  ...props
}) => {
  const { t } = useTranslation();

  // Disable background scrolling when modal is opened
  useEffect(() => {
    if (show) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
  }, [show]);

  return (
    <ModalWrapper className={show ? "show" : ""} show={show}>
      <Backdrop onClick={onCancel} />

      <ModalContent>
        <Close onClick={onCancel}>
          <CloseIcon color={tokens.colors.primaryLight3} />
        </Close>

        <Header>
          <Text variant="black18" color={tokens.colors.primaryDark3}>
            {title}
          </Text>
        </Header>

        {props.children && <Body>{props.children}</Body>}

        <Footer>
          <Button block variant="secondary" onClick={onCancel}>
            {t("button.cancel")}
          </Button>
          <Button block variant={variant || "primary"} onClick={onSubmit}>
            {t("button.submit")}
          </Button>
        </Footer>
      </ModalContent>
    </ModalWrapper>
  );
};

// styled components
const ModalContent = styled.div`
  position: absolute;
  max-width: 350px;
  background: ${tokens.colors.fff};
  border: 1px solid ${tokens.colors.darkGrey};
  border-radius: 4px;
  box-shadow: 0px 4px 20px -8px rgba(14, 44, 77, 0.15);
`;

const Header = styled.div`
  padding: 18px 24px;
  text-align: center;
`;

const Close = styled.div`
  color: ${tokens.colors.primaryLight3};
  position: absolute;
  left: auto;
  top: 0;
  right: 0;
  padding: 6px;
  cursor: pointer;
`;

const Body = styled.div`
  border-top: 1px solid ${tokens.colors.lightGrey};
`;

const Footer = styled.div`
  padding: 20px;
  display: flex;
  gap: 10px;
`;

const ModalWrapper = styled.div`
  -webkit-backdrop-filter: blur(4px);
  backdrop-filter: blur(4px);
  position: fixed;
  z-index: 10;
  width: 100vw;
  height: 100dvh;
  display: flex;
  align-items: center;
  justify-content: center;
  pointer-events: ${(props) => (props.show ? "auto" : "none")};
  opacity: 0;
  transition: 250ms ease;

  @supports (height: 100dvh) {
    position: fixed;
    bottom: max(0px, env(safe-area-inset-bottom));
  }

  &.show {
    opacity: 1;
  }
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

// Prop types
Modal.propTypes = {
  onCancel: PropTypes.func,
  onSubmit: PropTypes.func,
  setShow: PropTypes.func,
  show: PropTypes.bool,
  title: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  variant: PropTypes.string,
};
