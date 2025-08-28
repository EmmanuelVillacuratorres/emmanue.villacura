import React, { useState } from 'react';
import { registrarUsuario } from '../api/usuarios';

const Register = ({ onRegister }) => {
  const [form, setForm] = useState({ username: '', password: '', email: '' });

  const handleChange = e => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async e => {
    e.preventDefault();
    // Transforma los nombres de los campos aquí:
    const result = await registrarUsuario({
      nombreUsuario: form.username,
      password: form.password,
      correo: form.email
    });
    if (result.success) {
      alert('Usuario registrado correctamente');
             // Redirigir
    } else {
      alert('Error al registrar usuario');
    }
  };

  return (
    <div className="max-w-md mx-auto bg-white p-8 rounded-xl shadow-lg mt-12">
      <h2 className="text-2xl font-bold mb-6 text-center">Crear cuenta nueva</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          name="username"
          placeholder="Usuario"
          value={form.username}
          onChange={handleChange}
          className="w-full px-4 py-2 border rounded"
          required
        />
        <input
          type="email"
          name="email"
          placeholder="Correo electrónico"
          value={form.email}
          onChange={handleChange}
          className="w-full px-4 py-2 border rounded"
          required
        />
        <input
          type="password"
          name="password"
          placeholder="Contraseña"
          value={form.password}
          onChange={handleChange}
          className="w-full px-4 py-2 border rounded"
          required
        />
        <button
          type="submit"
          className="w-full py-2 bg-gradient-to-r from-pink-500 to-purple-600 text-white font-bold rounded"
        >
          Registrarse
        </button>
      </form>
    </div>
  );
};

export default Register;