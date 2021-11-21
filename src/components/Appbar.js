import React from 'react';
import styled from 'styled-components';
import { useAuthContext } from '../hooks/useAuthContext';
import { useLogout } from '../hooks/useLogout';
import { useLocation } from 'react-router';
import { tokens } from './UI/tokens';

import Hamburger from '../components/icons/Hamburger';
import FlexCenter from './UI/FlexCenter';
import A from './UI/A';

const Appbar = () => {
  const { logout } = useLogout();
  const { user } = useAuthContext();

  const { pathname } = useLocation();

  return (
    <AppbarWrapper>
      <LogoWrapper>LOGO</LogoWrapper>
      {user ? (
        <>
          <UserTab>
            <span>
              Hello, <b>{user.displayName}</b>.
            </span>
            <FlexCenter onClick={logout}>
              <Hamburger color={`${tokens.colors.darkGrey}`} />
            </FlexCenter>
          </UserTab>
        </>
      ) : (
        <LinkWrapper>
          {pathname === '/login' ? (
            <A to="/signup">Sign Up</A>
          ) : (
            <A to="/login">Login</A>
          )}
        </LinkWrapper>
      )}
    </AppbarWrapper>
  );
};

const AppbarWrapper = styled.div`
  height: 60px;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  background: #fff;
  border-bottom: 1px solid ${tokens.colors.lightGrey};
  padding: 20px;
`;

const LogoWrapper = styled.div`
  font-weight: bolder;
`;

const UserTab = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
`;

const LinkWrapper = styled.div``;

export default Appbar;
