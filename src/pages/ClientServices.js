import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Sparkles, Filter } from 'lucide-react';
import Layout from '../components/Layout';
import ProductCard from '../components/ProductCard';
import { obtenerProductos } from '../api/productos';
import { generateUniqueId } from '../utils/helpers';
import BookingForm from '../components/BookingForm';
import { crearReserva } from '../api/reservas';

const ClientServices = ({ user, onLoginClick }) => {
  const [products, setProducts] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [filter, setFilter] = useState('all');
  const [showBookingForm, setShowBookingForm] = useState(false);

  const categories = [
    { key: 'all', label: 'Todos los Servicios' },
    { key: 'manicure', label: 'Manicure' },
    { key: 'extension', label: 'Extensiones' },
    { key: 'art', label: 'Nail Art' },
    { key: 'pedicure', label: 'Pedicure' }
  ];

  useEffect(() => {
    const cargarProductos = async () => {
      const data = await obtenerProductos();
      setProducts(data);
    };
    cargarProductos();
  }, []);

  const filteredProducts = filter === 'all' 
    ? products.filter(p => p.Disponible)
    : products.filter(p => p.Categoria === filter && p.Disponible);

  const handleSelectProduct = (product) => {
    if (!user) {
      alert('Por favor, inicia sesión para reservar un servicio.');
      if (typeof onLoginClick === 'function') onLoginClick();
      return;
    }
    setSelectedProduct(product);
    setShowBookingForm(true);
  };

  const handleBookingSubmit = async (bookingData) => {
    if (!user || !user.id) {
      alert('Debes iniciar sesión para reservar.');
      return;
    }

    const reserva = {
      UsuarioId: user.id,
      ProductoId: bookingData.productId,
      Fecha: bookingData.date,
      Hora: bookingData.time, // <-- aquí debe llegar el valor correcto
      Estado: 'pendiente',
      Notas: bookingData.notes || '',
      CreadoEn: new Date(),
      Telefono: bookingData.telefonoCliente,
      Email: bookingData.correoCliente
    };

    await crearReserva(reserva);
    alert('¡Reserva enviada exitosamente!');
    setShowBookingForm(false);
    setSelectedProduct(null);
  };

  const handleBackToServices = () => {
    setShowBookingForm(false);
    setSelectedProduct(null);
  };

  if (showBookingForm && selectedProduct) {
    return (
      <BookingForm
        product={selectedProduct}
        onSubmit={handleBookingSubmit}
        onBack={handleBackToServices}
      />
    );
  }

  return (
    <div>
      {/* Solo el contenido de la página */}
      <h2 className="text-2xl font-bold mb-6 text-center">Nuestros Servicios</h2>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
      >
        {/* Elimina el logo y el h1 duplicado */}
        <p className="text-gray-600 text-lg max-w-2xl mx-auto mb-8 text-center">
          Descubre nuestra amplia gama de servicios de belleza para uñas. 
          Desde manicures clásicas hasta diseños artísticos únicos.
        </p>

        <motion.div 
          className="flex flex-wrap justify-center gap-3 mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          {categories.map((category, index) => (
            <motion.button
              key={category.key}
              onClick={() => setFilter(category.key)}
              className={`flex items-center gap-2 px-6 py-3 rounded-2xl font-medium transition-all duration-300 ${
                filter === category.key
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
              {category.label}
            </motion.button>
          ))}
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredProducts.map((product, index) => (
            <ProductCard
              key={product.Id}
              product={product}
              onSelect={handleSelectProduct}
              index={index}
            />
          ))}
        </div>

        {filteredProducts.length === 0 && (
          <motion.div 
            className="text-center py-16"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Sparkles className="w-12 h-12 text-gray-400" />
            </div>
            <h3 className="text-xl font-semibold text-gray-600 mb-2">
              No hay servicios disponibles
            </h3>
            <p className="text-gray-500">
              Intenta con otra categoría o vuelve más tarde.
            </p>
          </motion.div>
        )}
      </motion.div>
    </div>
  );
};

export default ClientServices;
