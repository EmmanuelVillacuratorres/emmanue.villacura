import React, { useState } from 'react';

const RestorePassword = ({ onRestore }) => {
  const [email, setEmail] = useState('');

  const handleSubmit = e => {
    e.preventDefault();
    if (onRestore) onRestore(email);
    alert('Si el correo existe, recibirás instrucciones para restaurar tu contraseña.');
  };

  return (
    <div className="max-w-md mx-auto bg-white p-8 rounded-xl shadow-lg mt-12">
      <h2 className="text-2xl font-bold mb-6 text-center">Restaurar contraseña</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="email"
          placeholder="Correo electrónico"
          value={email}
          onChange={e => setEmail(e.target.value)}
          className="w-full px-4 py-2 border rounded"
          required
        />
        <button
          type="submit"
          className="w-full py-2 bg-gradient-to-r from-pink-500 to-purple-600 text-white font-bold rounded"
        >
          Enviar instrucciones
        </button>
      </form>
    </div>
  );
};

// Ejemplo de función para usar en tu frontend
const onRestore = async (email) => {
  await fetch('http://localhost:5000/api/restore-password', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email }),
  });
};

export default RestorePassword;