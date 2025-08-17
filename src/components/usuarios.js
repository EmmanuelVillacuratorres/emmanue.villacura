import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Calendar, Clock, User, Phone, Mail, MessageSquare, ArrowLeft } from 'lucide-react';
import { formatPrice, formatDuration, getAvailableTimeSlots, isValidEmail, isValidPhone } from '../utils/helpers';

const BookingForm = ({ product, onSubmit, onBack }) => {
  const [formData, setFormData] = useState({
    clientName: '',
    clientEmail: '',
    clientPhone: '',
    date: '',
    time: '',
    notes: ''
  });

  const [errors, setErrors] = useState({});

  const handleInputChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }));
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.clientName.trim()) {
      newErrors.clientName = 'El nombre es requerido';
    }

    if (!formData.clientEmail.trim()) {
      newErrors.clientEmail = 'El email es requerido';
    } else if (!isValidEmail(formData.clientEmail)) {
      newErrors.clientEmail = 'Email inválido';
    }

    if (!formData.clientPhone.trim()) {
      newErrors.clientPhone = 'El teléfono es requerido';
    } else if (!isValidPhone(formData.clientPhone)) {
      newErrors.clientPhone = 'Teléfono inválido (formato: +56912345678)';
    }

    if (!formData.date) {
      newErrors.date = 'La fecha es requerida';
    }

    if (!formData.time) {
      newErrors.time = 'La hora es requerida';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      onSubmit({
        ...formData,
        productId: product.id
      });
    }
  };

  const today = new Date().toISOString().split('T')[0];
  const availableSlots = getAvailableTimeSlots(formData.date);

  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.5 }}
      className="bg-white/90 backdrop-blur-xl rounded-3xl shadow-xl overflow-hidden"
    >
      <div className="bg-gradient-to-r from-pink-500 to-purple-600 p-6 text-white">
        <div className="flex items-center gap-4 mb-4">
          <motion.button
            onClick={onBack}
            className="p-2 rounded-xl bg-white/20 hover:bg-white/30 transition-colors"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <ArrowLeft className="w-5 h-5" />
          </motion.button>
          <h2 className="text-2xl font-bold">Reservar Cita</h2>
        </div>
        
        <div className="bg-white/20 rounded-2xl p-4">
          <h3 className="font-semibold text-lg mb-2">{product.name}</h3>
          <div className="flex items-center justify-between text-sm">
            <span className="flex items-center gap-2">
              <Clock className="w-4 h-4" />
              {formatDuration(product.duration)}
            </span>
            <span className="font-bold text-lg">{formatPrice(product.price)}</span>
          </div>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="p-6 space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-gray-700 font-medium mb-2 flex items-center gap-2">
              <User className="w-4 h-4 text-gray-500" />
              Nombre Completo
            </label>
            <input
              type="text"
              value={formData.clientName}
              onChange={(e) => handleInputChange('clientName', e.target.value)}
              className={`w-full px-4 py-3 rounded-xl border-2 transition-colors ${
                errors.clientName ? 'border-red-300 bg-red-50' : 'border-gray-200 focus:border-pink-500'
              } focus:outline-none`}
              placeholder="Tu nombre completo"
            />
            {errors.clientName && (
              <p className="text-red-500 text-sm mt-1">{errors.clientName}</p>
            )}
          </div>

          <div>
            <label className="block text-gray-700 font-medium mb-2 flex items-center gap-2">
              <Mail className="w-4 h-4 text-gray-500" />
              Email
            </label>
            <input
              type="email"
              value={formData.clientEmail}
              onChange={(e) => handleInputChange('clientEmail', e.target.value)}
              className={`w-full px-4 py-3 rounded-xl border-2 transition-colors ${
                errors.clientEmail ? 'border-red-300 bg-red-50' : 'border-gray-200 focus:border-pink-500'
              } focus:outline-none`}
              placeholder="tu@email.com"
            />
            {errors.clientEmail && (
              <p className="text-red-500 text-sm mt-1">{errors.clientEmail}</p>
            )}
          </div>

          <div>
            <label className="block text-gray-700 font-medium mb-2 flex items-center gap-2">
              <Phone className="w-4 h-4 text-gray-500" />
              Teléfono
            </label>
            <input
              type="tel"
              value={formData.clientPhone}
              onChange={(e) => handleInputChange('clientPhone', e.target.value)}
              className={`w-full px-4 py-3 rounded-xl border-2 transition-colors ${
                errors.clientPhone ? 'border-red-300 bg-red-50' : 'border-gray-200 focus:border-pink-500'
              } focus:outline-none`}
              placeholder="+56912345678"
            />
            {errors.clientPhone && (
              <p className="text-red-500 text-sm mt-1">{errors.clientPhone}</p>
            )}
          </div>

          <div>
            <label className="block text-gray-700 font-medium mb-2 flex items-center gap-2">
              <Calendar className="w-4 h-4 text-gray-500" />
              Fecha
            </label>
            <input
              type="date"
              value={formData.date}
              onChange={(e) => handleInputChange('date', e.target.value)}
              min={today}
              className={`w-full px-4 py-3 rounded-xl border-2 transition-colors ${
                errors.date ? 'border-red-300 bg-red-50' : 'border-gray-200 focus:border-pink-500'
              } focus:outline-none`}
            />
            {errors.date && (
              <p className="text-red-500 text-sm mt-1">{errors.date}</p>
            )}
          </div>
        </div>

        {formData.date && (
          <div>
            <label className="block text-gray-700 font-medium mb-2 flex items-center gap-2">
              <Clock className="w-4 h-4 text-gray-500" />
              Hora Disponible
            </label>
            <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-2">
              {availableSlots.map((slot) => (
                <motion.button
                  key={slot}
                  type="button"
                  onClick={() => handleInputChange('time', slot)}
                  className={`py-2 px-3 rounded-lg font-medium transition-all ${
                    formData.time === slot
                      ? 'bg-gradient-to-r from-pink-500 to-purple-600 text-white'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  {slot}
                </motion.button>
              ))}
            </div>
            {errors.time && (
              <p className="text-red-500 text-sm mt-1">{errors.time}</p>
            )}
          </div>
        )}

        <div>
          <label className="block text-gray-700 font-medium mb-2 flex items-center gap-2">
            <MessageSquare className="w-4 h-4 text-gray-500" />
            Notas Adicionales (Opcional)
          </label>
          <textarea
            value={formData.notes}
            onChange={(e) => handleInputChange('notes', e.target.value)}
            rows={3}
            className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-pink-500 focus:outline-none resize-none"
            placeholder="Alguna preferencia especial o comentario..."
          />
        </div>

        <motion.button
          type="submit"
          className="w-full py-4 bg-gradient-to-r from-pink-500 to-purple-600 text-white font-bold rounded-xl shadow-lg hover:shadow-xl transition-all duration-300"
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          Confirmar Reserva
        </motion.button>
      </form>
    </motion.div>
  );
};

export default BookingForm;