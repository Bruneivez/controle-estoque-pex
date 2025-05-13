import { createContext, useState, useContext, useEffect, useMemo } from 'react';
import PropTypes from 'prop-types';

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const savedAuth = localStorage.getItem('isAuthenticated');
    if (savedAuth === 'true') {
      setIsAuthenticated(true);
    }
  }, []);

  const authActions = useMemo(() => ({
    login: (username, password) => {
      if (username === 'admin' && password === 'admin123') {
        setIsAuthenticated(true);
        localStorage.setItem('isAuthenticated', 'true');
        return true;
      }
      return false;
    },
    logout: () => {
      setIsAuthenticated(false);
      localStorage.removeItem('isAuthenticated');
    }
  }), []); // Dependências vazias pois não dependem de estado externo

  const contextValue = useMemo(() => ({
    isAuthenticated,
    ...authActions
  }), [isAuthenticated, authActions]);

  return (
    <AuthContext.Provider value={contextValue}>
      {children}
    </AuthContext.Provider>
  );
}

AuthProvider.propTypes = {
  children: PropTypes.node.isRequired
};

export const useAuth = () => useContext(AuthContext);