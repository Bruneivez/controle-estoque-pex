import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import PropTypes from 'prop-types'; // Importe o PropTypes

export function PrivateRoute({ children }) {
  const { isAuthenticated } = useAuth();
  return isAuthenticated ? children : <Navigate to="/login" />;
}

// Adicione a validação de props
PrivateRoute.propTypes = {
  children: PropTypes.node.isRequired
};