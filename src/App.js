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
import Navigation from './components/Navigation/Navigation';
import Appbar from './components/Navigation/Appbar';
import Clients from './pages/Clients';
import Dashboard from './pages/Dashboard';
import Reports from './pages/Reports';
import Authentication from './pages/Authentication';

function App() {
  const { authIsReady, user } = useAuthContext();

  return (
    <>
      {authIsReady && (
        <Router>
          {user && <Appbar />}
          <Body>
            <Routes>
              <Route
                path="/clients"
                element={user ? <Clients /> : <Navigate replace to="/" />}
              />
              <Route
                path="/dashboard"
                element={user ? <Dashboard /> : <Navigate replace to="/" />}
              />
              <Route
                path="/reports"
                element={user ? <Reports /> : <Navigate replace to="/" />}
              />

              <Route
                path="/"
                element={
                  !user ? (
                    <Authentication />
                  ) : (
                    <Navigate replace to="/dashboard" />
                  )
                }
              />

              <Route path="*" element={<Navigate replace to="/" />} />
            </Routes>
          </Body>
          {user && <Navigation />}
        </Router>
      )}
    </>
  );
}

// styled components
const Body = styled.div`
  overflow-x: hidden;
  width: 100%;
`;

export default App;
