import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Calendar, Clock, User, Phone, Mail, MessageSquare, Check, X, Filter } from 'lucide-react';
import { defaultProducts, defaultBookings } from '../mock/products';
import { formatPrice, formatDuration } from '../utils/helpers';
import { useNavigate } from 'react-router-dom';

const AdminBookings = ({ user, onLoginClick }) => {
  const navigate = useNavigate();
  const [bookings, setBookings] = useState(defaultBookings);
  const [products] = useState(defaultProducts);
  const [filter, setFilter] = useState('all');

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

  const statusOptions = [
    { key: 'all', label: 'Todas las Reservas', color: 'bg-gray-500' },
    { key: 'pending', label: 'Pendientes', color: 'bg-yellow-500' },
    { key: 'confirmed', label: 'Confirmadas', color: 'bg-green-500' },
    { key: 'cancelled', label: 'Canceladas', color: 'bg-red-500' }
  ];

  const filteredBookings = filter === 'all' 
    ? bookings 
    : bookings.filter(booking => booking.status === filter);

  const handleStatusChange = (bookingId, newStatus) => {
    setBookings(prev => prev.map(booking => 
      booking.id === bookingId ? { ...booking, status: newStatus } : booking
    ));
  };

  const getStatusColor = (status) => {
    const colors = {
      pending: 'bg-yellow-100 text-yellow-800 border-yellow-200',
      confirmed: 'bg-green-100 text-green-800 border-green-200',
      cancelled: 'bg-red-100 text-red-800 border-red-200'
    };
    return colors[status] || colors.pending;
  };

  const getStatusLabel = (status) => {
    const labels = {
      pending: 'Pendiente',
      confirmed: 'Confirmada',
      cancelled: 'Cancelada'
    };
    return labels[status] || 'Pendiente';
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
    >
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6 mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Gestión de Reservas</h1>
          <p className="text-gray-600">Administra las citas de tus clientes</p>
        </div>
        
        <div className="flex items-center gap-2 text-sm text-gray-600">
          <Calendar className="w-4 h-4" />
          <span>Total: {bookings.length} reservas</span>
        </div>
      </div>

      <motion.div 
        className="flex flex-wrap gap-3 mb-8"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        {statusOptions.map((status, index) => (
          <motion.button
            key={status.key}
            onClick={() => setFilter(status.key)}
            className={`flex items-center gap-2 px-4 py-2 rounded-xl font-medium transition-all duration-300 ${
              filter === status.key
                ? 'bg-gradient-to-r from-pink-500 to-purple-600 text-white shadow-lg'
                : 'bg-white/80 text-gray-700 hover:bg-white hover:shadow-md'
            }`}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.1 + 0.3 }}
          >
            <Filter className="w-4 h-4" />
            {status.label}
            <span className="ml-1 px-2 py-0.5 bg-black/10 rounded-lg text-xs">
              {status.key === 'all' ? bookings.length : bookings.filter(b => b.status === status.key).length}
            </span>
          </motion.button>
        ))}
      </motion.div>

      <div className="space-y-6">
        {filteredBookings.map((booking, index) => {
          const product = products.find(p => p.id === booking.productId);
          
          return (
            <motion.div
              key={booking.id}
              className="bg-white/90 backdrop-blur-sm rounded-2xl shadow-lg overflow-hidden"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              whileHover={{ scale: 1.01, y: -2 }}
            >
              <div className="p-6">
                <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
                  <div className="flex-1 space-y-4">
                    <div className="flex items-start justify-between">
                      <div>
                        <h3 className="text-xl font-bold text-gray-900 mb-1">
                          {booking.clientName}
                        </h3>
                        <div className="flex items-center gap-2">
                          <span className={`px-3 py-1 rounded-full text-sm font-semibold border ${getStatusColor(booking.status)}`}>
                            {getStatusLabel(booking.status)}
                          </span>
                        </div>
                      </div>
                      
                      <div className="text-right">
                        <p className="text-sm text-gray-500">ID: {booking.id}</p>
                        <p className="text-xs text-gray-400">
                          Creada: {new Date(booking.createdAt).toLocaleDateString()}
                        </p>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                      <div className="flex items-center gap-3">
                        <div className="p-2 bg-pink-100 rounded-lg">
                          <User className="w-4 h-4 text-pink-600" />
                        </div>
                        <div>
                          <p className="text-sm text-gray-500">Servicio</p>
                          <p className="font-semibold text-gray-900">{product?.name}</p>
                        </div>
                      </div>

                      <div className="flex items-center gap-3">
                        <div className="p-2 bg-blue-100 rounded-lg">
                          <Calendar className="w-4 h-4 text-blue-600" />
                        </div>
                        <div>
                          <p className="text-sm text-gray-500">Fecha y Hora</p>
                          <p className="font-semibold text-gray-900">
                            {booking.date} - {booking.time}
                          </p>
                        </div>
                      </div>

                      <div className="flex items-center gap-3">
                        <div className="p-2 bg-green-100 rounded-lg">
                          <Clock className="w-4 h-4 text-green-600" />
                        </div>
                        <div>
                          <p className="text-sm text-gray-500">Duración y Precio</p>
                          <p className="font-semibold text-gray-900">
                            {formatDuration(product?.duration || 0)} - {formatPrice(product?.price || 0)}
                          </p>
                        </div>
                      </div>

                      <div className="flex items-center gap-3">
                        <div className="p-2 bg-purple-100 rounded-lg">
                          <Phone className="w-4 h-4 text-purple-600" />
                        </div>
                        <div>
                          <p className="text-sm text-gray-500">Teléfono</p>
                          <p className="font-semibold text-gray-900">{booking.clientPhone}</p>
                        </div>
                      </div>

                      <div className="flex items-center gap-3">
                        <div className="p-2 bg-orange-100 rounded-lg">
                          <Mail className="w-4 h-4 text-orange-600" />
                        </div>
                        <div>
                          <p className="text-sm text-gray-500">Email</p>
                          <p className="font-semibold text-gray-900">{booking.clientEmail}</p>
                        </div>
                      </div>

                      {booking.notes && (
                        <div className="flex items-start gap-3 md:col-span-2 lg:col-span-1">
                          <div className="p-2 bg-gray-100 rounded-lg">
                            <MessageSquare className="w-4 h-4 text-gray-600" />
                          </div>
                          <div>
                            <p className="text-sm text-gray-500">Notas</p>
                            <p className="font-semibold text-gray-900">{booking.notes}</p>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>

                  {booking.status === 'pending' && (
                    <div className="flex flex-col sm:flex-row gap-3 lg:flex-col">
                      <motion.button
                        onClick={() => handleStatusChange(booking.id, 'confirmed')}
                        className="flex items-center justify-center gap-2 px-6 py-3 bg-green-500 text-white font-semibold rounded-xl hover:bg-green-600 transition-colors"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        <Check className="w-4 h-4" />
                        Confirmar
                      </motion.button>
                      
                      <motion.button
                        onClick={() => handleStatusChange(booking.id, 'cancelled')}
                        className="flex items-center justify-center gap-2 px-6 py-3 bg-red-500 text-white font-semibold rounded-xl hover:bg-red-600 transition-colors"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        <X className="w-4 h-4" />
                        Cancelar
                      </motion.button>
                    </div>
                  )}
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>

      {filteredBookings.length === 0 && (
        <motion.div 
          className="text-center py-16"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <Calendar className="w-12 h-12 text-gray-400" />
          </div>
          <h3 className="text-xl font-semibold text-gray-600 mb-2">
            No hay reservas para mostrar
          </h3>
          <p className="text-gray-500">
            {filter === 'all' 
              ? 'Aún no tienes reservas registradas.'
              : `No hay reservas con estado "${statusOptions.find(s => s.key === filter)?.label}".`
            }
          </p>
        </motion.div>
      )}
    </motion.div>
  );
};

export default AdminBookings;