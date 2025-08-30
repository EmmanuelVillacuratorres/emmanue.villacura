import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useNavigate, Navigate } from 'react-router-dom';
import ClientServices from './pages/ClientServices';
import AdminDashboard from './pages/AdminDashboard';
import AdminProducts from './pages/AdminProducts';
import AdminBookings from './pages/AdminBookings';
import LoginModal from './components/LoginModal';
import { users } from './mock/users';
import Layout from './components/Layout';
import Register from './pages/Register';
import RestorePassword from './pages/RestorePassword';
import UsuariosList from './components/UsuariosList';
import { loginUsuario } from './api/usuarios';
import ReservasUsuarios from './pages/ReservasUsuarios';

const App = () => {
  // Recupera el usuario de localStorage al cargar la app
  const [currentUser, setCurrentUser] = useState(() => {
    const saved = localStorage.getItem('user');
    return saved ? JSON.parse(saved) : null;
  });
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const navigate = useNavigate();

  // Si el usuario cambia, actualiza localStorage
  useEffect(() => {
    if (currentUser) {
      localStorage.setItem('user', JSON.stringify(currentUser));
    } else {
      localStorage.removeItem('user');
    }
  }, [currentUser]);

  const handleLogin = async (username, password) => {
    const result = await loginUsuario({ username, password });
    if (result.success) {
      // Guarda el usuario completo, incluyendo el Id
      setCurrentUser({
        id: result.user.Id,
        username: result.user.NombreUsuario,
        email: result.user.Correo,
        role: result.user.Rol
      });
      // Redirige o muestra mensaje de éxito
    } else {
      alert(result.message || 'Usuario o contraseña incorrectos');
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('user');
    setCurrentUser(null);
    navigate('/');
  };

  const handleRegister = (form) => {
    const newUser = {
      username: form.username,
      password: form.password,
      email: form.email,
      role: 'user'
    };
    users.push(newUser);
    alert('Usuario registrado correctamente');
    navigate('/');
  };

  const handleRestorePassword = (email) => {
    alert('Si el correo existe, recibirás instrucciones para restaurar tu contraseña.');
  };

  const handleAdminCreateUser = (form) => {
    const newUser = {
      username: form.username,
      password: form.password,
      email: form.email,
      role: form.role
    };
    users.push(newUser);
    alert('Usuario creado correctamente');
  };

  return (
    <Layout user={currentUser} onLogout={handleLogout} onLoginClick={() => setIsLoginModalOpen(true)}>
      <Routes>
        <Route 
          path="/" 
          element={
            <ClientServices 
              user={currentUser} 
              onLoginClick={() => setIsLoginModalOpen(true)} 
            />
          } 
        />
        <Route 
          path="/admin" 
          element={
            <AdminDashboard user={currentUser} />
          } 
        />
        <Route 
          path="/admin/products" 
          element={
            <AdminProducts 
              user={currentUser} 
              onLoginClick={() => setIsLoginModalOpen(true)} 
            />
          } 
        />
        <Route 
          path="/admin/bookings" 
          element={
            <AdminBookings 
              user={currentUser} 
              onLoginClick={() => setIsLoginModalOpen(true)} 
            />
          } 
        />
        <Route path="/register" element={<Register onRegister={handleRegister} />} />
        <Route path="/restore-password" element={<RestorePassword onRestore={handleRestorePassword} />} />
        <Route path="/usuarios" element={<UsuariosList />} />
        <Route
          path="/mis-reservas"
          element={
            currentUser
              ? <ReservasUsuarios user={currentUser} />
              : <Navigate to="/login" replace />
          }
        />
      </Routes>
      <LoginModal 
        isOpen={isLoginModalOpen} 
        onClose={() => setIsLoginModalOpen(false)} 
        onLogin={handleLogin} 
      />
    </Layout>
  );
};

// Wrapper para usar useNavigate en App
const AppWrapper = () => (
  <Router>
    <App />
  </Router>
);

export default AppWrapper;