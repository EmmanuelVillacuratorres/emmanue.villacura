import React from 'react';
import { motion } from 'framer-motion';
import { useNavigate, useLocation, Link } from 'react-router-dom';
import { Sparkles, User, Settings, Home, LogIn, LogOut } from 'lucide-react';

const Layout = ({ user, onLogout, onLoginClick, children }) => {
  const navigate = useNavigate();
  const location = useLocation();

  const clientNavItems = [
    { path: '/', label: 'Servicios', icon: Sparkles }
  ];

  const adminNavItems = [
    { path: '/admin', label: 'Dashboard', icon: Home },
    { path: '/admin/products', label: 'Productos', icon: Sparkles },
    { path: '/admin/bookings', label: 'Reservas', icon: User }
  ];

  const navItems = user?.role === 'admin' ? adminNavItems : clientNavItems;

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 via-purple-50 to-indigo-50">
      <motion.nav 
        className="bg-white/90 backdrop-blur-xl border-b border-pink-200/50 sticky top-0 z-50"
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            <motion.div 
              className="flex items-center gap-3 cursor-pointer"
              whileHover={{ scale: 1.05 }}
              onClick={() => navigate('/')}
            >
              <img src="https://4tsix0yujj.ufs.sh/f/2vMRHqOYUHc0lvKvSyCXbcAaSYNqKr0LMw3z9nWTuy4eIjix" alt="Mora.Artt Logo" className="w-10 h-10" />
              <h1 className="text-xl font-bold bg-gradient-to-r from-pink-600 to-purple-600 bg-clip-text text-transparent">
                Mora.Artt
              </h1>
            </motion.div>

            <div className="flex items-center gap-2">
              {navItems.map((item) => {
                const Icon = item.icon;
                const isActive = location.pathname === item.path;
                return (
                  <motion.button
                    key={item.path}
                    onClick={() => navigate(item.path)}
                    className={`flex items-center gap-2 px-4 py-2 rounded-xl font-medium transition-all duration-300 ${
                      isActive
                        ? 'bg-gradient-to-r from-pink-500 to-purple-600 text-white shadow-lg'
                        : 'text-gray-600 hover:text-gray-900 hover:bg-pink-50'
                    }`}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <Icon className="w-4 h-4" />
                    <span className="hidden sm:block">{item.label}</span>
                  </motion.button>
                );
              })}

              {/* Botón para ver usuarios solo para admin */}
              {user?.role === 'admin' && (
                <motion.button
                  onClick={() => navigate('/usuarios')}
                  className={`flex items-center gap-2 px-4 py-2 rounded-xl font-medium transition-all duration-300 ${
                    location.pathname === '/usuarios'
                      ? 'bg-gradient-to-r from-pink-500 to-purple-600 text-white shadow-lg'
                      : 'text-gray-600 hover:text-gray-900 hover:bg-blue-50'
                  }`}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <User className="w-4 h-4" />
                  <span className="hidden sm:block">Ver Usuarios</span>
                </motion.button>
              )}

              {user ? (
                <motion.button
                  onClick={() => {
                    if (typeof onLogout === 'function') onLogout();
                    navigate('/'); // Redirige a inicio
                  }}
                  className="flex items-center gap-2 px-4 py-2 rounded-xl font-medium text-gray-600 hover:text-gray-900 hover:bg-gray-50 transition-all duration-300"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <LogOut className="w-4 h-4" />
                  <span className="hidden sm:block">Salir ({user.username})</span>
                </motion.button>
              ) : (
                <motion.button
                  onClick={onLoginClick}
                  className="flex items-center gap-2 px-4 py-2 rounded-xl font-medium text-gray-600 hover:text-gray-900 hover:bg-gray-50 transition-all duration-300"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <LogIn className="w-4 h-4" />
                  <span className="hidden sm:block">Ingresar</span>
                </motion.button>
              )}
            </div>
          </div>
        </div>
      </motion.nav>

      <main className="container mx-auto px-4 py-8 max-w-6xl">
        {children}
      </main>
    </div>
  );
};

export default Layout;
