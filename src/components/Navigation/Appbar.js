import React, { useEffect, useRef, useState } from 'react';
import styled, { keyframes } from 'styled-components';
import moment from 'moment';
import { useAuthContext } from '../../hooks/useAuthContext';
import { useLogout } from '../../hooks/useLogout';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { useCollection } from '../../hooks/useCollection';
import { tokens } from '../UI/tokens';

import Hamburger from '../icons/Hamburger';
import SignoutIcon from '../icons/SignoutIcon';
import FlexCenter from '../UI/FlexCenter';
import Logo from '../UI/Logo';
import Text from '../UI/Text';
import CalendarIcon from '../icons/CalendarIcon';
import SecretIcon from '../icons/SecretIcon';
import SettingsIcon from '../icons/SettingsIcon';

const Appbar = () => {
  const [visible, setVisible] = useState(false);

  const wrapperNode = useRef();

  const navigate = useNavigate();

  const { logout } = useLogout();

  const { user } = useAuthContext();

  const { t } = useTranslation();

  const { documents } = useCollection('users');

  const handleClickOutside = (e) => {
    if (wrapperNode.current && wrapperNode.current.contains(e.target)) {
      return;
    }
    setVisible(false);
  };

  const pushToSettings = () => {
    setVisible(false);
    navigate('/settings');
  };

  const pushToAdminPage = () => {
    setVisible(false);
    navigate('/admin');
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

  const timeIconProps = {
    size: 16,
    color: tokens.colors.darkGrey,
  };

  return (
    <AppbarWrapper>
      <Logo />

      {user && (
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
                      <h2>{t('appbar.hello')}</h2>
                      {user.displayName}
                      <FlexCenter style={{ marginTop: '20px', gap: '10px' }}>
                        <FlexCenter style={{ gap: '2px' }}>
                          <CalendarIcon {...timeIconProps} />
                          <Text
                            variant="medium12"
                            color={tokens.colors.mediumGrey}
                          >
                            {moment().format('YYYY.MM.DD, dddd')}
                          </Text>
                        </FlexCenter>
                      </FlexCenter>
                    </PopoverTitle>
                  </FlexCenter>

                  {documents && documents[0].admin && (
                    <>
                      <DividerLine />
                      <PopoverMenuItem onClick={pushToAdminPage}>
                        <PopoverMenuText>
                          <SecretIcon {...iconProps} />
                          {t('appbar.admin')}
                        </PopoverMenuText>
                      </PopoverMenuItem>
                    </>
                  )}

                  <DividerLine />

                  <PopoverMenuItem onClick={pushToSettings}>
                    <PopoverMenuText>
                      <SettingsIcon {...iconProps} />
                      {t('appbar.settings')}
                    </PopoverMenuText>
                  </PopoverMenuItem>

                  <PopoverMenuItem onClick={logout}>
                    <PopoverMenuText>
                      <SignoutIcon {...iconProps} />
                      {t('appbar.logout')}
                    </PopoverMenuText>
                  </PopoverMenuItem>
                </Popover>
              </>
            )}
          </span>
        </UserTab>
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
  bottom: 60px;
`;

const Popover = styled.div`
  width: 200px;
  background: ${tokens.colors.fff};
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
  justify-content: center;
  gap: 6px;
`;

const DividerLine = styled.div`
  height: 1px;
  width: 100%;
  background: ${tokens.colors.primaryLight4};
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
