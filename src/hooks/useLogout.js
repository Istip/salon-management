import { useEffect, useState } from 'react';
import { projectAuth } from '../firebase/config';
import { useAuthContext } from './useAuthContext';

export const useLogout = () => {
  const [cancelled, setCancelled] = useState(false);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const { dispatch } = useAuthContext();

  const logout = async () => {
    setError(null);
    setLoading(true);

    try {
      // sign the user out
      await projectAuth.signOut();

      // dispatch logout action
      dispatch({ type: 'LOGOUT' });

      // update state
      if (!cancelled) {
        setLoading(false);
        setError(null);
      }
    } catch (err) {
      if (!cancelled) {
        console.log(error.message);
        setLoading(false);
        setError(err.message);
      }
    }
  };

  useEffect(() => {
    return () => setCancelled(true);
  }, []);

  return { logout, error, loading };
};
