import React, { useState } from 'react';
import styled from 'styled-components';
import { tokens } from '../components/UI/tokens';

// project imports
import Signup from '../components/Signup';
import Login from '../components/Login';
import Logo from '../components/UI/Logo';

const Authentication = () => {
  const [page, setPage] = useState('login');

  return (
    <AuthenticationWrapper>
      <PageHeader>
        <Logo />
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
  display: flex;
  align-items: center;
  flex-direction: column;
  width: 100%;

  color: ${tokens.colors.primaryDark4};
`;

const PageHeader = styled.div`
  padding: 20px 0;
  min-height: 120px;
  margin-bottom: 30px;
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
  padding: 30px;
  margin: 20px;
  border-radius: 20px;
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

const HeadingText = styled.h1``;

export default Authentication;
