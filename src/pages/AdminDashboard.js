import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Calendar, Package, Users, TrendingUp, Clock, CheckCircle, AlertCircle } from 'lucide-react';
import { defaultProducts, defaultBookings } from '../mock/products';
import { formatPrice } from '../utils/helpers';
import { useNavigate } from 'react-router-dom';

const AdminDashboard = ({ user, onLoginClick }) => {
  const navigate = useNavigate();
  const [products] = useState(defaultProducts);
  const [bookings] = useState(defaultBookings);

  if (!user || user.role !== 'admin') {
    return (
      <motion.div 
        className="text-center py-20 bg-white/90 backdrop-blur-xl rounded-3xl shadow-xl"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <img src="https://4tsix0yujj.ufs.sh/f/2vMRHqOYUHc0lvKvSyCXbcAaSYNqKr0LMw3z9nWTuy4eIjix" alt="Mora.Artt Logo" className="w-32 h-32 mx-auto mb-6" />
        <h2 className="text-3xl font-bold text-gray-900 mb-4">Acceso Restringido</h2>
        <p className="text-gray-600 mb-6">
          Solo los administradores tienen acceso a esta sección. Por favor, inicia sesión con una cuenta de administrador.
        </p>
        <motion.button
          onClick={onLoginClick}
          className="px-8 py-3 bg-gradient-to-r from-pink-500 to-purple-600 text-white font-bold rounded-xl shadow-lg hover:shadow-xl transition-all duration-300"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          Iniciar Sesión
        </motion.button>
      </motion.div>
    );
  }

  const stats = {
    totalProducts: products.length,
    activeProducts: products.filter(p => p.available).length,
    totalBookings: bookings.length,
    pendingBookings: bookings.filter(b => b.status === 'pending').length,
    confirmedBookings: bookings.filter(b => b.status === 'confirmed').length,
    totalRevenue: bookings
      .filter(b => b.status === 'confirmed')
      .reduce((sum, booking) => {
        const product = products.find(p => p.id === booking.productId);
        return sum + (product?.price || 0);
      }, 0)
  };

  const recentBookings = bookings
    .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
    .slice(0, 5);

  const statCards = [
    {
      title: 'Productos Activos',
      value: `${stats.activeProducts}/${stats.totalProducts}`,
      icon: Package,
      color: 'from-blue-500 to-cyan-500',
      bgColor: 'from-blue-50 to-cyan-50'
    },
    {
      title: 'Reservas Pendientes',
      value: stats.pendingBookings,
      icon: Clock,
      color: 'from-amber-500 to-orange-500',
      bgColor: 'from-amber-50 to-orange-50'
    },
    {
      title: 'Reservas Confirmadas',
      value: stats.confirmedBookings,
      icon: CheckCircle,
      color: 'from-green-500 to-emerald-500',
      bgColor: 'from-green-50 to-emerald-50'
    },
    {
      title: 'Ingresos del Mes',
      value: formatPrice(stats.totalRevenue),
      icon: TrendingUp,
      color: 'from-purple-500 to-pink-500',
      bgColor: 'from-purple-50 to-pink-50'
    }
  ];

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
    >
      <motion.div 
        className="mb-8"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Panel de Administración</h1>
        <p className="text-gray-600">Gestiona tus productos desde aquí</p>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {statCards.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <motion.div
              key={stat.title}
              className={`bg-gradient-to-br ${stat.bgColor} rounded-2xl p-6 border border-white/50`}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              whileHover={{ scale: 1.02, y: -2 }}
            >
              <div className="flex items-center justify-between mb-4">
                <div className={`p-3 rounded-xl bg-gradient-to-r ${stat.color}`}>
                  <Icon className="w-6 h-6 text-white" />
                </div>
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-1">{stat.value}</h3>
              <p className="text-gray-600 font-medium">{stat.title}</p>
            </motion.div>
          );
        })}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <motion.div
          className="bg-white/90 backdrop-blur-sm rounded-2xl p-6 shadow-lg"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          <div className="flex items-center gap-3 mb-6">
            <Calendar className="w-6 h-6 text-purple-500" />
            <h2 className="text-xl font-bold text-gray-900">Reservas Recientes</h2>
          </div>

          <div className="space-y-4">
            {recentBookings.map((booking, index) => {
              const product = products.find(p => p.id === booking.productId);
              return (
                <motion.div
                  key={booking.id}
                  className="flex items-center justify-between p-4 bg-gray-50 rounded-xl"
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 + 0.5 }}
                >
                  <div className="flex-1">
                    <h4 className="font-semibold text-gray-900">{booking.clientName}</h4>
                    <p className="text-sm text-gray-600">{product?.name}</p>
                    <p className="text-xs text-gray-500">{booking.date} - {booking.time}</p>
                  </div>
                  <div className="text-right">
                    <span className={`inline-block px-3 py-1 rounded-full text-xs font-semibold ${
                      booking.status === 'confirmed' 
                        ? 'bg-green-100 text-green-800'
                        : 'bg-yellow-100 text-yellow-800'
                    }`}>
                      {booking.status === 'confirmed' ? 'Confirmada' : 'Pendiente'}
                    </span>
                    <p className="text-sm font-bold text-gray-900 mt-1">
                      {formatPrice(product?.price || 0)}
                    </p>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </motion.div>

        <motion.div
          className="bg-white/90 backdrop-blur-sm rounded-2xl p-6 shadow-lg"
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.6 }}
        >
          <div className="flex items-center gap-3 mb-6">
            <Users className="w-6 h-6 text-pink-500" />
            <h2 className="text-xl font-bold text-gray-900">Servicios Populares</h2>
          </div>

          <div className="space-y-4">
            {products.slice(0, 5).map((product, index) => (
              <motion.div
                key={product.id}
                className="flex items-center justify-between p-4 bg-gray-50 rounded-xl"
                initial={{ opacity: 0, x: 10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 + 0.7 }}
              >
                <div className="flex items-center gap-4">
                  <img 
                    src={product.image} 
                    alt={product.name}
                    className="w-12 h-12 rounded-lg object-cover"
                  />
                  <div>
                    <h4 className="font-semibold text-gray-900">{product.name}</h4>
                    <p className="text-sm text-gray-600">{formatPrice(product.price)}</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  {product.available ? (
                    <CheckCircle className="w-5 h-5 text-green-500" />
                  ) : (
                    <AlertCircle className="w-5 h-5 text-red-500" />
                  )}
                  <span className="text-sm font-medium text-gray-600">
                    {product.available ? 'Activo' : 'Inactivo'}
                  </span>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default AdminDashboard;