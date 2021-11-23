import React, { useEffect, useRef, useState } from 'react';
import styled, { keyframes } from 'styled-components';
import { useAuthContext } from '../../hooks/useAuthContext';
import { useLogout } from '../../hooks/useLogout';
import { tokens } from '../UI/tokens';

import Hamburger from '../icons/Hamburger';
import SignoutIcon from '../icons/SignoutIcon';
import SettingsIcon from '../icons/SettingsIcon';
import FlexCenter from '../UI/FlexCenter';
import Logo from '../UI/Logo';

const Appbar = () => {
  const [visible, setVisible] = useState(false);

  const wrapperNode = useRef();

  const { logout } = useLogout();

  const { user } = useAuthContext();

  const handleClickOutside = (e) => {
    if (wrapperNode.current && wrapperNode.current.contains(e.target)) {
      return;
    }
    setVisible(false);
  };

  useEffect(() => {
    if (wrapperNode) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const iconProps = {
    size: 18,
    color: tokens.colors.primaryDark4,
  };

  return (
    <AppbarWrapper>
      <Logo />
      {user && (
        <>
          <UserTab>
            <FlexCenter onClick={() => setVisible(true)}>
              <Hamburger color={`${tokens.colors.darkGrey}`} />
            </FlexCenter>
            <span ref={wrapperNode}>
              {visible && (
                <>
                  <Backdrop onClick={() => setVisible(false)} />
                  <Popover>
                    <FlexCenter>
                      <PopoverTitle>
                        <h2>Hello,</h2>

                        {user.displayName}
                      </PopoverTitle>
                    </FlexCenter>

                    <Divier />

                    <PopoverMenuItem>
                      <PopoverMenuText>
                        <SettingsIcon {...iconProps} />
                        Settings
                      </PopoverMenuText>
                    </PopoverMenuItem>

                    <Divier />

                    <PopoverMenuItem onClick={logout}>
                      <PopoverMenuText>
                        <SignoutIcon {...iconProps} />
                        Log out
                      </PopoverMenuText>
                    </PopoverMenuItem>
                  </Popover>
                </>
              )}
            </span>
          </UserTab>
        </>
      )}
    </AppbarWrapper>
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

const Backdrop = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: ${tokens.colors.primaryDark2};
  opacity: 0.5;
`;

const Popover = styled.div`
  width: 200px;
  background: #fff;
  border-radius: 4px;
  border: 1px solid ${tokens.colors.primaryLight3};
  position: absolute;
  right: 0px;
  top: 30px;
  box-shadow: 0 2px 5px rgba(42, 129, 227, 0.15);
  animation: ${fadeIn} 400ms ease;
  user-select: none;
`;

const PopoverTitle = styled.div`
  color: ${tokens.colors.primaryDark1};
  font-size: 12px;
  font-weight: 700;
  padding: 24px;
  text-align: center;

  h2 {
    color: ${tokens.colors.primaryDark3};
  }
`;

const PopoverMenuItem = styled.div`
  text-align: left;
  padding: 12px 12px 12px 8px;
  margin: 8px;
  border-radius: 4px;
  background: ${tokens.colors.white};
  color: ${tokens.colors.primaryDark4};
  cursor: pointer;
  transition: 250ms ease;
  font-weight: 700;
  font-size: 12px;

  &:hover {
    background: ${tokens.colors.primaryLight4};
  }

  &:active {
    background: ${tokens.colors.primaryLight4};
  }
`;

const PopoverMenuText = styled.div`
  display: flex;
  align-items: center;
  gap: 6px;
`;

const Divier = styled.div`
  height: 1px;
  width: 100%;
  background: ${tokens.colors.primaryLight4};
`;

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

const UserTab = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
  cursor: pointer;
`;

export default Appbar;
