import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Plus, Search, Filter } from 'lucide-react';
import ProductCard from '../components/ProductCard';
import { defaultProducts } from '../mock/products';
import { generateUniqueId } from '../utils/helpers';
import { useNavigate } from 'react-router-dom';

const AdminProducts = ({ user, onLoginClick }) => {
  const navigate = useNavigate();
  const [products, setProducts] = useState(defaultProducts);
  const [searchTerm, setSearchTerm] = useState('');
  const [filter, setFilter] = useState('all');
  const [showAddForm, setShowAddForm] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);

  const [formData, setFormData] = useState({
    name: '',
    description: '',
    price: '',
    duration: '',
    category: 'manicure',
    image: '',
    available: true
  });

  if (!user || user.role !== 'admin') {
    return (
      <div>
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
      </div>
    );
  }

  const categories = [
    { key: 'all', label: 'Todos' },
    { key: 'manicure', label: 'Manicure' },
    { key: 'extension', label: 'Extensiones' },
    { key: 'art', label: 'Nail Art' },
    { key: 'pedicure', label: 'Pedicure' }
  ];

  const filteredProducts = products.filter(product => {
    const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         product.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = filter === 'all' || product.category === filter;
    return matchesSearch && matchesFilter;
  });

  const handleAddProduct = () => {
    setFormData({
      name: '',
      description: '',
      price: '',
      duration: '',
      category: 'manicure',
      image: '',
      available: true
    });
    setEditingProduct(null);
    setShowAddForm(true);
  };

  const handleEditProduct = (product) => {
    setFormData({
      name: product.name,
      description: product.description,
      price: product.price.toString(),
      duration: product.duration.toString(),
      category: product.category,
      image: product.image,
      available: product.available
    });
    setEditingProduct(product);
    setShowAddForm(true);
  };

  const handleSubmitProduct = (e) => {
    e.preventDefault();
    
    const productData = {
      ...formData,
      price: parseInt(formData.price),
      duration: parseInt(formData.duration),
      image: formData.image || 'https://images.unsplash.com/photo-1604654894610-df63bc536371?w=400'
    };

    if (editingProduct) {
      setProducts(prev => prev.map(p => 
        p.id === editingProduct.id ? { ...p, ...productData } : p
      ));
    } else {
      const newProduct = {
        id: generateUniqueId(),
        ...productData
      };
      setProducts(prev => [newProduct, ...prev]);
    }

    setShowAddForm(false);
    setEditingProduct(null);
  };

  const handleToggleAvailability = (productId) => {
    setProducts(prev => prev.map(p => 
      p.id === productId ? { ...p, available: !p.available } : p
    ));
  };

  const handleInputChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  if (showAddForm) {
    return (
      <div>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="max-w-2xl mx-auto"
        >
          <div className="bg-white/90 backdrop-blur-xl rounded-3xl shadow-xl p-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">
              {editingProduct ? 'Editar Producto' : 'Agregar Nuevo Producto'}
            </h2>

            <form onSubmit={handleSubmitProduct} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-gray-700 font-medium mb-2">Nombre del Servicio</label>
                  <input
                    type="text"
                    value={formData.name}
                    onChange={(e) => handleInputChange('name', e.target.value)}
                    className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-pink-500 focus:outline-none"
                    required
                  />
                </div>

                <div>
                  <label className="block text-gray-700 font-medium mb-2">Categoría</label>
                  <select
                    value={formData.category}
                    onChange={(e) => handleInputChange('category', e.target.value)}
                    className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-pink-500 focus:outline-none"
                  >
                    {categories.slice(1).map(cat => (
                      <option key={cat.key} value={cat.key}>{cat.label}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-gray-700 font-medium mb-2">Precio (CLP)</label>
                  <input
                    type="number"
                    value={formData.price}
                    onChange={(e) => handleInputChange('price', e.target.value)}
                    className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-pink-500 focus:outline-none"
                    required
                  />
                </div>

                <div>
                  <label className="block text-gray-700 font-medium mb-2">Duración (minutos)</label>
                  <input
                    type="number"
                    value={formData.duration}
                    onChange={(e) => handleInputChange('duration', e.target.value)}
                    className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-pink-500 focus:outline-none"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block text-gray-700 font-medium mb-2">Descripción</label>
                <textarea
                  value={formData.description}
                  onChange={(e) => handleInputChange('description', e.target.value)}
                  rows={3}
                  className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-pink-500 focus:outline-none resize-none"
                  required
                />
              </div>

              <div>
                <label className="block text-gray-700 font-medium mb-2">URL de Imagen</label>
                <input
                  type="url"
                  value={formData.image}
                  onChange={(e) => handleInputChange('image', e.target.value)}
                  className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-pink-500 focus:outline-none"
                  placeholder="https://ejemplo.com/imagen.jpg"
                />
              </div>

              <div className="flex items-center gap-3">
                <input
                  type="checkbox"
                  id="available"
                  checked={formData.available}
                  onChange={(e) => handleInputChange('available', e.target.checked)}
                  className="w-5 h-5 text-pink-500 rounded focus:ring-pink-500"
                />
                <label htmlFor="available" className="text-gray-700 font-medium">
                  Servicio disponible
                </label>
              </div>

              <div className="flex gap-4">
                <motion.button
                  type="submit"
                  className="flex-1 py-3 bg-gradient-to-r from-pink-500 to-purple-600 text-white font-bold rounded-xl shadow-lg hover:shadow-xl transition-all duration-300"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  {editingProduct ? 'Actualizar Producto' : 'Agregar Producto'}
                </motion.button>
                
                <motion.button
                  type="button"
                  onClick={() => setShowAddForm(false)}
                  className="px-6 py-3 bg-gray-200 text-gray-700 font-bold rounded-xl hover:bg-gray-300 transition-colors"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  Cancelar
                </motion.button>
              </div>
            </form>
          </div>
        </motion.div>
      </div>
    );
  }

  return (
    <div>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
      >
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6 mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Gestión de Productos</h1>
            <p className="text-gray-600">Administra tu catálogo de servicios</p>
          </div>
          
          <motion.button
            onClick={handleAddProduct}
            className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-pink-500 to-purple-600 text-white font-bold rounded-xl shadow-lg hover:shadow-xl transition-all duration-300"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Plus className="w-5 h-5" />
            Agregar Producto
          </motion.button>
        </div>

        <div className="flex flex-col md:flex-row gap-4 mb-8">
          <div className="flex-1 relative">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Buscar productos..."
              className="w-full pl-12 pr-4 py-3 rounded-xl border-2 border-gray-200 focus:border-pink-500 focus:outline-none"
            />
          </div>

          <div className="flex gap-2">
            {categories.map((category) => (
              <motion.button
                key={category.key}
                onClick={() => setFilter(category.key)}
                className={`flex items-center gap-2 px-4 py-3 rounded-xl font-medium transition-all duration-300 ${
                  filter === category.key
                    ? 'bg-gradient-to-r from-pink-500 to-purple-600 text-white'
                    : 'bg-white/80 text-gray-700 hover:bg-white'
                }`}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Filter className="w-4 h-4" />
                {category.label}
              </motion.button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredProducts.map((product, index) => (
            <ProductCard
              key={product.id}
              product={product}
              onEdit={handleEditProduct}
              onToggleAvailability={handleToggleAvailability}
              isAdmin={true}
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
              <Search className="w-12 h-12 text-gray-400" />
            </div>
            <h3 className="text-xl font-semibold text-gray-600 mb-2">
              No se encontraron productos
            </h3>
            <p className="text-gray-500">
              Intenta con otros términos de búsqueda o agrega un nuevo producto.
            </p>
          </motion.div>
        )}
      </motion.div>
    </div>
  );
};

export default AdminProducts;