import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Calendar, Clock, User, Phone, Mail, MessageSquare, ArrowLeft } from 'lucide-react';
import { formatPrice, formatDuration, getAvailableTimeSlots, isValidEmail, isValidPhone } from '../utils/helpers';

// Cambia la URL a tu servidor remoto y los nombres de los campos
export async function registrarUsuario({ nombreUsuario, password, correo }) {
 const res = await fetch('https://dev.matiivilla.cl:4000/api/usuarios', {
 //   const res = await fetch('http://localhost:4000/api/usuarios', {

    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      NombreUsuario: nombreUsuario,
      HashPassword: password,
      Correo: correo,
      Rol: "usuario"
    })
  });
  return await res.json();
}

const BookingForm = ({ product, onSubmit, onBack }) => {
  const [formData, setFormData] = useState({
    nombreCliente: '',
    correoCliente: '',
    telefonoCliente: '',
    fecha: '',
    hora: '',
    notas: ''
  });

  const [form, setForm] = useState({
    nombreCliente: '',
    fecha: '',
    hora: '',
    notas: '',
    telefono: '',
    email: ''
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

    if (!formData.nombreCliente.trim()) {
      newErrors.nombreCliente = 'El nombre es requerido';
    }

    if (!formData.correoCliente.trim()) {
      newErrors.correoCliente = 'El email es requerido';
    } else if (!isValidEmail(formData.correoCliente)) {
      newErrors.correoCliente = 'Email inválido';
    }

    if (!formData.telefonoCliente.trim()) {
      newErrors.telefonoCliente = 'El teléfono es requerido';
    } else if (!isValidPhone(formData.telefonoCliente)) {
      newErrors.telefonoCliente = 'Teléfono inválido (formato: +56912345678)';
    }

    if (!formData.fecha) {
      newErrors.fecha = 'La fecha es requerida';
    }

    if (!formData.hora) {
      newErrors.hora = 'La hora es requerida';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      onSubmit({
        nombreCliente: formData.nombreCliente,
        correoCliente: formData.correoCliente,
        telefonoCliente: formData.telefonoCliente,
        date: formData.fecha,
        time: formData.hora, // <-- asegúrate de enviar la hora seleccionada
        notes: formData.notas,
        productId: product.Id
      });
    }
  };

  const today = new Date().toISOString().split('T')[0];
  const availableSlots = getAvailableTimeSlots(formData.fecha);

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
          <h3 className="font-semibold text-lg mb-2">{product.Nombre}</h3>
          <div className="flex items-center justify-between text-sm">
            <span className="flex items-center gap-2">
              <Clock className="w-4 h-4" />
              {formatDuration(product.Duracion)}
            </span>
            <span className="font-bold text-lg">{formatPrice(product.Precio)}</span>
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
              value={formData.nombreCliente}
              onChange={(e) => handleInputChange('nombreCliente', e.target.value)}
              className={`w-full px-4 py-3 rounded-xl border-2 transition-colors ${
                errors.nombreCliente ? 'border-red-300 bg-red-50' : 'border-gray-200 focus:border-pink-500'
              } focus:outline-none`}
              placeholder="Tu nombre completo"
            />
            {errors.nombreCliente && (
              <p className="text-red-500 text-sm mt-1">{errors.nombreCliente}</p>
            )}
          </div>

          <div>
            <label className="block text-gray-700 font-medium mb-2 flex items-center gap-2">
              <Mail className="w-4 h-4 text-gray-500" />
              Email
            </label>
            <input
              type="email"
              value={formData.correoCliente}
              onChange={(e) => handleInputChange('correoCliente', e.target.value)}
              className={`w-full px-4 py-3 rounded-xl border-2 transition-colors ${
                errors.correoCliente ? 'border-red-300 bg-red-50' : 'border-gray-200 focus:border-pink-500'
              } focus:outline-none`}
              placeholder="tu@email.com"
            />
            {errors.correoCliente && (
              <p className="text-red-500 text-sm mt-1">{errors.correoCliente}</p>
            )}
          </div>

          <div>
            <label className="block text-gray-700 font-medium mb-2 flex items-center gap-2">
              <Phone className="w-4 h-4 text-gray-500" />
              Teléfono
            </label>
            <input
              type="tel"
              value={formData.telefonoCliente}
              onChange={(e) => handleInputChange('telefonoCliente', e.target.value)}
              className={`w-full px-4 py-3 rounded-xl border-2 transition-colors ${
                errors.telefonoCliente ? 'border-red-300 bg-red-50' : 'border-gray-200 focus:border-pink-500'
              } focus:outline-none`}
              placeholder="+56912345678"
            />
            {errors.telefonoCliente && (
              <p className="text-red-500 text-sm mt-1">{errors.telefonoCliente}</p>
            )}
          </div>

          <div>
            <label className="block text-gray-700 font-medium mb-2 flex items-center gap-2">
              <Calendar className="w-4 h-4 text-gray-500" />
              Fecha
            </label>
            <input
              type="date"
              name="date"
              value={formData.date}
              onChange={e => handleInputChange('date', e.target.value)}
              required
              className={`w-full px-4 py-3 rounded-xl border-2 transition-colors ${
                errors.fecha ? 'border-red-300 bg-red-50' : 'border-gray-200 focus:border-pink-500'
              } focus:outline-none`}
            />
            {errors.fecha && (
              <p className="text-red-500 text-sm mt-1">{errors.fecha}</p>
            )}
          </div>
        </div>

        {formData.fecha && (
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
                  onClick={() => handleInputChange('hora', slot)}
                  className={`py-2 px-3 rounded-lg font-medium transition-all ${
                    formData.hora === slot
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
            {errors.hora && (
              <p className="text-red-500 text-sm mt-1">{errors.hora}</p>
            )}
          </div>
        )}

        <div>
          <label className="block text-gray-700 font-medium mb-2 flex items-center gap-2">
            <MessageSquare className="w-4 h-4 text-gray-500" />
            Notas Adicionales (Opcional)
          </label>
          <textarea
            value={formData.notas}
            onChange={(e) => handleInputChange('notas', e.target.value)}
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