export const defaultProducts = [
  {
    id: '1',
    name: 'Manicure Clásica',
    description: 'Limado, cutícula y esmaltado básico',
    price: 15000,
    duration: 45,
    category: 'manicure',
    image: 'https://images.unsplash.com/photo-1604654894610-df63bc536371?w=400',
    available: true
  },
  {
    id: '2',
    name: 'Manicure Francesa',
    description: 'Elegante diseño francés con acabado perfecto',
    price: 20000,
    duration: 60,
    category: 'manicure',
    image: 'https://images.unsplash.com/photo-1610992015732-2449b76344bc?w=400',
    available: true
  },
  {
    id: '3',
    name: 'Uñas Acrílicas',
    description: 'Extensión con acrílico y diseño personalizado',
    price: 39000,
    duration: 120,
    category: 'extension',
    image: 'https://images.unsplash.com/photo-1632345031435-8727f6897d53?w=400',
    available: true
  },
  {
    id: '4',
    name: 'Nail Art Premium',
    description: 'Diseños artísticos únicos y personalizados',
    price: 45000,
    duration: 90,
    category: 'art',
    image: 'https://images.unsplash.com/photo-1607779097040-26e80aa78e66?w=400',
    available: true
  },
  {
    id: '5',
    name: 'Pedicure Spa',
    description: 'Tratamiento completo con exfoliación y masaje',
    price: 25000,
    duration: 75,
    category: 'pedicure',
    image: 'https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?w=400',
    available: true
  }
];

export const defaultBookings = [
  {
    id: '1',
    clientName: 'María González',
    clientEmail: 'maria@email.com',
    clientPhone: '+56912345678',
    productId: '1',
    date: '2025-01-25',
    time: '14:30',
    status: 'pending',
    notes: 'Prefiero colores suaves',
    createdAt: new Date('2025-01-20')
  },
  {
    id: '2',
    clientName: 'Ana Rodríguez',
    clientEmail: 'ana@email.com',
    clientPhone: '+56987654321',
    productId: '3',
    date: '2025-01-26',
    time: '10:00',
    status: 'confirmed',
    notes: 'Primera vez con acrílicas',
    createdAt: new Date('2025-01-19')
  }
];