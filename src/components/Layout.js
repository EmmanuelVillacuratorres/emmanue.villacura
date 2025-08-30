import React from 'react';
import { motion } from 'framer-motion';
import { useNavigate, useLocation, Link } from 'react-router-dom';
import { Sparkles, User, Settings, Home, LogIn, LogOut, Heart } from 'lucide-react';

const Layout = ({ user, onLogout, onLoginClick, children }) => {
  const navigate = useNavigate();
  const location = useLocation();

  const clientNavItems = [
    { path: '/', label: 'Servicios', icon: Sparkles },
    // Solo agrega "Mis Reservas" si el usuario está logueado
    ...(user ? [{ path: '/mis-reservas', label: 'Mis Reservas', icon: User }] : [])
  ];

  const adminNavItems = [
    { path: '/admin', label: 'Dashboard', icon: Home },
    { path: '/admin/products', label: 'Productos', icon: Sparkles },
    { path: '/admin/bookings', label: 'Reservas', icon: User }
  ];

  const navItems = user?.role === 'admin' ? adminNavItems : clientNavItems;

  const socialLinks = [
    { href: 'https://www.instagram.com/mora.artt/', icon: <img src="https://cdn.jsdelivr.net/gh/simple-icons/simple-icons/icons/instagram.svg" alt="Instagram" className="w-5 h-5" /> },
    //{ href: 'https://facebook.com/', icon: <img src="https://cdn.jsdelivr.net/gh/simple-icons/simple-icons/icons/facebook.svg" alt="Facebook" className="w-5 h-5" /> },
    { href: 'emmanuel.villacura@inacapmail.cl', icon: <img src="https://cdn.jsdelivr.net/gh/simple-icons/simple-icons/icons/gmail.svg" alt="Correo" className="w-5 h-5" /> },
    { href: 'https://wa.me/+56999809393', icon: <img src="https://cdn.jsdelivr.net/gh/simple-icons/simple-icons/icons/whatsapp.svg" alt="WhatsApp" className="w-5 h-5" /> },
  ];

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
              <img src="https://previews.dropbox.com/p/thumb/ACutIndtBHNaJmfhPyhIbzRfSlOT_In5RWoJ5fHCGu2CBHPAUDyTaP7j0SqJgLn97ztOtOdJ0MajKNahfF9wj8n7KCfaG2x45yq4YqV9KscGdx-k49ihLqh3bN1nrBM7LOjJOvYEwX3rNpZkd0rov7GoJmUJKFc8yarw_FItaKZiNBAazjkrlivtVvea2VXSENX3lIU3alkitZiGrrYrC_FuZb8lBA7Bbype8NDA09qymwDj8bhoylNGCieGw-rI-IQfLxnhew7U32h2O-fGeCDls3DfuO_fVt16dtTadqKfFN5D3K0qb6JC79myFlK5qwqqJo78a-NYRMUTA0S0rZVa/p.gif?is_prewarmed=true" alt="Mora.Artt Logo" className="w-16 h-16 drop-shadow-lg" />
              <h1 className="text-xl font-bold bg-gradient-to-r from-pink-600 to-purple-600 bg-clip-text text-transparent">
                Mora.Artt
              </h1>
            </motion.div>

            <div className="flex items-center gap-2">
              <nav>
                <ul className="flex gap-6">
                  {navItems.map(item => (
                    <li key={item.path}>
                      <Link
                        to={item.path}
                        className={`flex items-center gap-2 px-4 py-2 rounded-xl font-medium transition-all duration-300
                          ${location.pathname === item.path
                            ? 'bg-gradient-to-r from-pink-500 to-purple-600 text-white shadow-lg'
                            : 'text-gray-600 hover:text-gray-900 hover:bg-blue-50'}
                        `}
                      >
                        {item.icon && <item.icon className="w-5 h-5" />}
                        {item.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </nav>

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

      <footer className="w-full bg-gray-100 text-center py-4 mt-auto border-t flex items-center justify-between px-6">
        <Heart className="text-pink-500 w-6 h-6" />
        <div className="flex items-center gap-4 justify-center flex-1">
          {socialLinks.map((link, idx) => (
            <a
              key={idx}
              href={link.href}
              target="_blank"
              rel="noopener noreferrer"
              className="transition duration-200 hover:scale-110
                hover:[filter:_brightness(0)_saturate(100%)_invert(39%)_sepia(97%)_saturate(749%)_hue-rotate(314deg)_brightness(97%)_contrast(101%)]"
            >
              {link.icon}
            </a>
          ))}
          <span className="text-gray-500 text-sm ml-4">
            © {new Date().getFullYear()} Mora.Artt. Todos los derechos reservados.   Emamnuel Villacura
          </span>
        </div>
        <Heart className="text-pink-500 w-6 h-6" />
      </footer>
    </div>
  );
};

export default Layout;
