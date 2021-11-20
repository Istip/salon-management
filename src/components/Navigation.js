import React from 'react';
import styled from 'styled-components';
import { Link, useLocation } from 'react-router-dom';

import Nav from 'rsuite/Nav';
import UserIcon from './icons/UserIcon';
import ListIcon from './icons/ListIcon';
import CalendarIcon from './icons/CalendarIcon';

const Navigation = () => {
  const { pathname } = useLocation();

  const navItems = [
    {
      to: '/users',
      icon: <UserIcon color={pathname === '/users' ? '#2A81E3' : '#111'} />,
    },
    {
      to: '/',
      icon: <ListIcon color={pathname === '/' ? '#2A81E3' : '#111'} />,
    },
    {
      to: '/calendar',
      icon: (
        <CalendarIcon color={pathname === '/calendar' ? '#2A81E3' : '#111'} />
      ),
    },
  ];

  return (
    <>
      <Navbar appearance="subtle" justified>
        {navItems.map((item) => (
          <Nav.Item
            as={Link}
            key={item.to}
            to={item.to}
            active={item.to === pathname}
            icon={item.icon}
          />
        ))}
      </Navbar>
    </>
  );
};

// styled components
const Navbar = styled(Nav)`
  position: fixed;
  width: 100%;
  bottom: 0;
  text-align: center;
  border-top: 1px solid #eee;
`;

export default Navigation;
