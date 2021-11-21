import React from 'react';
import styled from 'styled-components';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from 'react-router-dom';
import { useAuthContext } from './hooks/useAuthContext';

// project imports
import Navigation from './components/Navigation';
import Clients from './pages/Clients';
import Today from './pages/Today';
import Calendar from './pages/Calendar';
import Signup from './pages/Signup';
import Login from './pages/Login';
import Appbar from './components/Appbar';

function App() {
  const { authIsReady, user } = useAuthContext();

  return (
    <div>
      {authIsReady && (
        <Router>
          {user && <Appbar />}
          <Body>
            <Routes>
              <Route
                path="/clients"
                element={user ? <Clients /> : <Navigate replace to="/login" />}
              />
              <Route
                path="/"
                element={user ? <Today /> : <Navigate replace to="/login" />}
              />
              <Route
                path="/calendar"
                element={user ? <Calendar /> : <Navigate replace to="/login" />}
              />

              <Route
                path="/signup"
                element={!user ? <Signup /> : <Navigate replace to="/" />}
              />
              <Route
                path="/login"
                element={!user ? <Login /> : <Navigate replace to="/" />}
              />
            </Routes>
          </Body>
          {user && <Navigation />}
        </Router>
      )}
    </div>
  );
}

// styled components
const Body = styled.div`
  margin: 5px;
  padding: 10px;
  overflow-x: hidden;
`;

export default App;
