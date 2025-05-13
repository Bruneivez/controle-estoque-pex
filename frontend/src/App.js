import React from 'react';
import { BrowserRouter as Router, Route, Routes, Link, useLocation } from 'react-router-dom';
import PropTypes from 'prop-types';
import CopoList from './components/CopoList';
import CopoForm from './components/CopoForm';
import { Login } from './pages/Login';
import { PrivateRoute } from './components/PrivateRoute';
import { AuthProvider, useAuth } from './context/AuthContext'; // Adicione useAuth na importação
import './index.css';

const NavLink = ({ to, children }) => {
  const location = useLocation();
  const isActive = location.pathname === to;

  return (
    <Link
      to={to}
      className={`app-nav-link ${isActive ? 'active' : ''}`}
    >
      {children}
    </Link>
  );
};

NavLink.propTypes = {
  to: PropTypes.string.isRequired,
  children: PropTypes.node.isRequired
};

const AppContent = () => {
  const { isAuthenticated, logout } = useAuth(); // Agora useAuth está disponível

  return (
    <div className="app-container">
      <header className="app-header">
        <h1>Controle de Estoque</h1>
        {isAuthenticated && (
          <button onClick={logout} className="logout-button">
            Sair
          </button>
        )}
      </header>

      {isAuthenticated && (
        <nav className="app-nav">
          <NavLink to="/">Listar itens</NavLink>
          <NavLink to="/novo">Adicionar item</NavLink>
        </nav>
      )}

      <Routes>
        <Route path="/login" element={<Login />} />
        <Route
          path="/"
          element={
            <PrivateRoute>
              <CopoList />
            </PrivateRoute>
          }
        />
        <Route
          path="/novo"
          element={
            <PrivateRoute>
              <CopoForm />
            </PrivateRoute>
          }
        />
        <Route
          path="/editar/:id"
          element={
            <PrivateRoute>
              <CopoForm />
            </PrivateRoute>
          }
        />
      </Routes>
    </div>
  );
};

const App = () => {
  return (
    <Router>
      <AuthProvider>
        <AppContent />
      </AuthProvider>
    </Router>
  );
};

export default App;