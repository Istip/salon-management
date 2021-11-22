import React from 'react';
import styled from 'styled-components';
import { useAuthContext } from '../hooks/useAuthContext';
import { useLogout } from '../hooks/useLogout';
import { tokens } from './UI/tokens';

import Hamburger from '../components/icons/Hamburger';
import FlexCenter from './UI/FlexCenter';

const Appbar = () => {
  const { logout } = useLogout();
  const { user } = useAuthContext();

  return (
    <AppbarWrapper>
      <LogoWrapper>LOGO</LogoWrapper>
      {user && (
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

export default Appbar;
