import { useEffect, useRef, useState } from "react";
import styled from "styled-components";
import { useAuthContext } from "../../hooks/useAuthContext";
import { tokens } from "../UI/tokens";

import Hamburger from "../icons/Hamburger";
import FlexCenter from "../UI/FlexCenter";
import Logo from "../UI/Logo";
import AppbarPopover from "./AppbarPopover";
import ClientsIcon from "../icons/ClientsIcon";
import { Link, useLocation } from "react-router-dom";
import NotesIcon from "../icons/NotesIcon";

const Appbar = () => {
  const [visible, setVisible] = useState(false);

  const { pathname } = useLocation();

  const wrapperNode = useRef();

  const { primary, darkGrey } = tokens.colors;

  const { user } = useAuthContext();

  const handleClickOutside = (e) => {
    if (wrapperNode.current && wrapperNode.current.contains(e.target)) {
      return;
    }
    setVisible(false);
  };

  useEffect(() => {
    if (wrapperNode) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <AppbarWrapper>
      <Logo />

      {user && (
        <UserTab>
          <FlexCenter>
            <MenuItemWrapper padding={4}>
              <Link to="/clients">
                <ClientsIcon
                  color={pathname === "/clients" ? primary : darkGrey}
                />
              </Link>
            </MenuItemWrapper>
            <MenuItemWrapper padding={4}>
              <Link to="/reports">
                <NotesIcon
                  color={pathname === "/reports" ? primary : darkGrey}
                />
              </Link>
            </MenuItemWrapper>
            <span onClick={() => setVisible(true)} style={{ marginLeft: 16 }}>
              <Hamburger color={`${tokens.colors.darkGrey}`} />
            </span>
          </FlexCenter>
          <span ref={wrapperNode}>
            {visible && <AppbarPopover user={user} setVisible={setVisible} />}
          </span>
        </UserTab>
      )}
    </AppbarWrapper>
  );
};

// Styled components

const MenuItemWrapper = styled.div`
  padding: ${({ padding }) => (padding ? `0 ${padding}px` : "0 16px")};
`;

const AppbarWrapper = styled.div`
  position: fixed;
  z-index: 2;
  top: 0;
  height: 60px;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  background: ${tokens.colors.fff};
  border-bottom: 1px solid ${tokens.colors.lightGrey};
  padding: 20px;
`;

const UserTab = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
  cursor: pointer;
`;

export default Appbar;
