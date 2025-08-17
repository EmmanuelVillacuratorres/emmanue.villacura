import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, useNavigate } from 'react-router-dom';
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

const App = () => {
  const [currentUser, setCurrentUser] = useState(null);
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (username, password) => {
    const result = await loginUsuario({ username, password });
    if (result.success) {
      setCurrentUser({
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
    localStorage.removeItem('token');
    localStorage.removeItem('role');
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