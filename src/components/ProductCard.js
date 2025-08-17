import React from 'react';
import { motion } from 'framer-motion';
import { Clock, Star, Sparkles } from 'lucide-react';
import { formatPrice, formatDuration } from '../utils/helpers';

const ProductCard = ({ 
  product, 
  onSelect, 
  onEdit, 
  onToggleAvailability,
  isAdmin = false,
  index = 0 
}) => {
  const categoryColors = {
    manicure: 'from-pink-500 to-rose-500',
    extension: 'from-purple-500 to-indigo-500',
    art: 'from-indigo-500 to-blue-500',
    pedicure: 'from-emerald-500 to-teal-500'
  };

  // Usa el nombre de la categoría de la BD
  const categoryColor = categoryColors[product.Categoria?.toLowerCase()] || categoryColors.manicure;
  const disponible = product.Disponible === true || product.Disponible === 1;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className={`bg-white/90 backdrop-blur-sm rounded-3xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 ${
        !disponible ? 'opacity-60' : ''
      }`}
      whileHover={{ scale: 1.02, y: -5 }}
    >
      <div className="relative">
        <img 
          src={product.UrlImagen || '/img/default-product.png'} 
          alt={product.Nombre}
          className="w-full h-48 object-cover"
        />
        <div className={`absolute top-4 left-4 px-3 py-1 rounded-full bg-gradient-to-r ${categoryColor} text-white text-xs font-semibold uppercase tracking-wider`}>
          {product.Categoria}
        </div>
        {!disponible && (
          <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
            <span className="text-white font-bold text-lg">No Disponible</span>
          </div>
        )}
      </div>

      <div className="p-6">
        <div className="flex items-start justify-between mb-3">
          <h3 className="text-xl font-bold text-gray-900">{product.Nombre}</h3>
          <div className="flex items-center gap-1">
            <Star className="w-4 h-4 text-yellow-400 fill-current" />
            <span className="text-sm text-gray-600">4.8</span>
          </div>
        </div>

        <p className="text-gray-600 mb-4 leading-relaxed">{product.Descripcion}</p>

        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <Clock className="w-4 h-4 text-gray-400" />
              <span className="text-sm text-gray-600">{formatDuration(product.Duracion)}</span>
            </div>
          </div>
          <div className="text-right">
            <span className="text-2xl font-bold text-gray-900">{formatPrice(product.Precio)}</span>
          </div>
        </div>

        <div className="flex gap-3">
          {!isAdmin ? (
            <motion.button
              onClick={() => onSelect(product)}
              disabled={!disponible}
              className={`flex-1 py-3 px-6 rounded-xl font-semibold transition-all duration-300 flex items-center justify-center gap-2 ${
                disponible
                  ? `bg-gradient-to-r ${categoryColor} text-white shadow-lg hover:shadow-xl`
                  : 'bg-gray-200 text-gray-400 cursor-not-allowed'
              }`}
              whileHover={disponible ? { scale: 1.05 } : {}}
              whileTap={disponible ? { scale: 0.95 } : {}}
            >
              <Sparkles className="w-4 h-4" />
              Reservar
            </motion.button>
          ) : (
            <>
              <motion.button
                onClick={() => onEdit(product)}
                className="flex-1 py-3 px-6 rounded-xl font-semibold bg-blue-500 text-white hover:bg-blue-600 transition-all duration-300"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Editar
              </motion.button>
              <motion.button
                onClick={() => onToggleAvailability(product.Id)}
                className={`px-6 py-3 rounded-xl font-semibold transition-all duration-300 ${
                  disponible
                    ? 'bg-red-500 text-white hover:bg-red-600'
                    : 'bg-green-500 text-white hover:bg-green-600'
                }`}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                {disponible ? 'Desactivar' : 'Activar'}
              </motion.button>
            </>
          )}
        </div>
      </div>
    </motion.div>
  );
};

export default ProductCard;