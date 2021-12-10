import React, { useState } from 'react';
import styled from 'styled-components';
import { useTranslation } from 'react-i18next';
import { tokens } from '../components/UI/tokens';

// project imports
import Signup from '../components/Authentication/Signup';
import Login from '../components/Authentication/Login';
import Logo from '../components/UI/Logo';

const Authentication = () => {
  const [page, setPage] = useState('login');

  const { t } = useTranslation();

  const AuthText = () => {
    if (page === 'login') {
      return (
        <>
          <Small>{t('auth.not_yet_member')}</Small>
          <SmallLink onClick={() => setPage('signup')}>
            {t('auth.sign_up')}
          </SmallLink>
        </>
      );
    }

    return (
      <>
        <Small>{t('auth.already_a_member')}</Small>
        <SmallLink onClick={() => setPage('login')}>
          {t('auth.login')}
        </SmallLink>
      </>
    );
  };

  return (
    <AuthenticationWrapper>
      <PageHeader>
        <Logo large />
      </PageHeader>
      <PageBody>
        {page === 'login' ? <Login /> : <Signup />}

        <Menu>
          <AuthText />
        </Menu>
      </PageBody>
    </AuthenticationWrapper>
  );
};

// styled components
const AuthenticationWrapper = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
  width: 100%;

  color: ${tokens.colors.primaryDark4};
`;

const PageHeader = styled.div`
  padding: 20px 0;
  min-height: 120px;
  background: #fff;
  border-bottom: 1px solid ${tokens.colors.lightGrey};
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  gap: 6px;
`;

const PageBody = styled.div`
  padding: 20px;
  width: 100%;
`;

const Menu = styled.div`
  padding: 30px 0 10px;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
`;

const Small = styled.small``;

const SmallLink = styled.small`
  font-weight: 700;
  color: ${tokens.colors.primary};
  cursor: pointer;

  &:hover {
    text-decoration: underline;
  }
`;

export default Authentication;
