import React, { useState } from 'react';
import styled from 'styled-components';

// project imports
import Signup from '../components/Signup';
import Login from '../components/Login';
import { tokens } from '../components/UI/tokens';

const Authentication = () => {
  const [page, setPage] = useState('login');

  return (
    <AuthenticationWrapper>
      <PageHeader>
        <LogoWrapper>
          <Logo />
          <LogoText>LOGO</LogoText>
        </LogoWrapper>
        <HeadingText>{page === 'login' ? 'Login' : 'Sign up'}</HeadingText>
      </PageHeader>
      <PageBody>
        {page === 'login' ? <Login /> : <Signup />}

        <Menu>
          {page === 'login' ? (
            <>
              <Small>Not yet a member?</Small>
              <SmallLink onClick={() => setPage('signup')}>Sign Up</SmallLink>
            </>
          ) : (
            <>
              <Small>Already registered?</Small>
              <SmallLink onClick={() => setPage('login')}>Login</SmallLink>
            </>
          )}
        </Menu>
      </PageBody>
    </AuthenticationWrapper>
  );
};

// styled components
const AuthenticationWrapper = styled.div`
  height: calc(100vh - 30px);
  display: flex;
  align-items: center;
  flex-direction: column;

  color: ${tokens.colors.primaryDark4};
`;

const PageHeader = styled.div`
  padding: 20px 0;
  min-height: 120px;
  width: 100%;
  margin-bottom: 30px;
  background: #fff;
  border-bottom: 1px solid ${tokens.colors.lightGrey};

  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  gap: 6px;
`;

const PageBody = styled.div`
  background: #fff;
  padding: 30px;
  margin: 10px;
  border-radius: 20px;
  border: 1px solid ${tokens.colors.primaryLight4};
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

const LogoWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 5px;
`;

const Logo = styled.div`
  border-radius: 50%;
  width: 12px;
  height: 12px;
  background: ${tokens.colors.primaryLight2};
`;

const LogoText = styled.div`
  color: ${tokens.colors.primaryLight2};
  font-size: 10px;
  font-weight: 900;
`;

const HeadingText = styled.h1``;

export default Authentication;
