import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, User, Lock } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const LoginModal = ({ isOpen, onClose, onLogin }) => {
  const navigate = useNavigate();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');
    if (!username || !password) {
      setError('Por favor, ingresa usuario y contraseña.');
      return;
    }
    onLogin(username, password)
      .then(() => {
        onClose();
        setUsername('');
        setPassword('');
      })
      .catch((err) => {
        setError(err.message);
      });
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4"
        >
          <motion.div
            initial={{ y: -50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 50, opacity: 0 }}
            className="bg-white/95 backdrop-blur-xl rounded-3xl p-8 shadow-2xl w-full max-w-md relative"
          >
            <button
              onClick={onClose}
              className="absolute top-4 right-4 p-2 rounded-full bg-gray-100 hover:bg-gray-200 transition-colors"
            >
              <X className="w-5 h-5 text-gray-600" />
            </button>

            <div className="text-center mb-8">
              <img src="https://4tsix0yujj.ufs.sh/f/2vMRHqOYUHc0lvKvSyCXbcAaSYNqKr0LMw3z9nWTuy4eIjix" alt="Mora.Artt Logo" className="w-24 h-24 mx-auto mb-4" />
              <h2 className="text-3xl font-bold text-gray-900 mb-2">Iniciar Sesión ctm</h2>
              <p className="text-gray-600">Accede a tu cuenta de Mora.Artt</p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label className="block text-gray-700 font-medium mb-2 flex items-center gap-2">
                  <User className="w-4 h-4 text-gray-500" /> Usuario
                </label>
                <input
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-pink-500 focus:outline-none"
                  placeholder="Tu nombre de usuario"
                />
              </div>
              <div>
                <label className="block text-gray-700 font-medium mb-2 flex items-center gap-2">
                  <Lock className="w-4 h-4 text-gray-500" /> Contraseña
                </label>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-pink-500 focus:outline-none"
                  placeholder="Tu contraseña"
                />
              </div>

              {error && (
                <motion.p
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="text-red-500 text-sm text-center"
                >
                  {error}
                </motion.p>
              )}

              <motion.button
                type="submit"
                className="w-full py-4 bg-gradient-to-r from-pink-500 to-purple-600 text-white font-bold rounded-xl shadow-lg hover:shadow-xl transition-all duration-300"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                Ingresar
              </motion.button>
            </form>

            <div className="mt-4 text-center">
              <button
                type="button"
                className="w-full py-2 mt-4 bg-gradient-to-r from-purple-500 to-pink-500 text-white font-bold rounded"
                onClick={() => {
                  onClose();
                  navigate('/register');
                }}
              >
                Registrar nuevo
              </button>
              <button
                type="button"
                className="text-sm text-purple-600 underline"
                onClick={() => {
                  onClose();
                  navigate('/restore-password');
                }}
              >
                ¿Olvidaste tu contraseña?
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default LoginModal;