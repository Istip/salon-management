import React, { useEffect, useRef, useState } from 'react';
import styled from 'styled-components';
import { useAuthContext } from '../../hooks/useAuthContext';
import { tokens } from '../UI/tokens';

import Hamburger from '../icons/Hamburger';
import FlexCenter from '../UI/FlexCenter';
import Logo from '../UI/Logo';
import AppbarPopover from './AppbarPopover';

const Appbar = () => {
  const [visible, setVisible] = useState(false);

  const wrapperNode = useRef();

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

  return (
    <AppbarWrapper>
      <Logo />

      {user && (
        <UserTab>
          <FlexCenter onClick={() => setVisible(true)}>
            <Hamburger color={`${tokens.colors.darkGrey}`} />
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
