import React, { useEffect } from 'react';
import styled from 'styled-components';
import moment from 'moment';
import i18n from './translations/i18n';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from 'react-router-dom';
import { useLocalStorage } from './hooks/useLocalStorage';
import { useAuthContext } from './hooks/useAuthContext';

// project imports
import Navigation from './components/Navigation/Navigation';
import Appbar from './components/Navigation/Appbar';
import Clients from './pages/Clients';
import Dashboard from './pages/Dashboard';
import Reports from './pages/Reports';
import Authentication from './pages/Authentication';
import Settings from './pages/Settings';
import Admin from './pages/Admin';

// moment locale imports
import 'moment/locale/hu';
import 'moment/locale/en-gb';

function App() {
  // state handling the global language for translation and moment lolcale
  const [language, setLanguage] = useLocalStorage('language', 'hu');

  const { authIsReady, user } = useAuthContext();

  useEffect(() => {
    moment.locale(language);
    i18n.changeLanguage(language);
  }, [language]);

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
                path="/settings"
                element={
                  user ? (
                    <Settings setLanguage={setLanguage} />
                  ) : (
                    <Navigate replace to="/" />
                  )
                }
              />
              <Route
                path="/admin"
                element={
                  user && user.uid === process.env.REACT_APP_ADMIN_ID ? (
                    <Admin />
                  ) : (
                    <Navigate replace to="/" />
                  )
                }
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
