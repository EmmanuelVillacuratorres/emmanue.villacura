import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { obtenerReservas } from '../api/reservas';

const ReservasUsuarios = ({ user }) => {
  const [reservas, setReservas] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const cargarReservas = async () => {
      try {
        const todas = await obtenerReservas();
        console.log(todas); // <-- Agrega esto
        const propias = todas.filter(r => r.UsuarioId == user.id); // Usa '==' para evitar problemas de tipo
        setReservas(propias);
      } catch (error) {
        alert('Error al cargar reservas: ' + error.message);
      }
    };
    if (user) cargarReservas();
  }, [user]);

  if (!user) return null; // No muestra nada si no está logueado

  return (
    <div className="max-w-3xl mx-auto py-8">
      <h2 className="text-2xl font-bold mb-6">Mis Reservas</h2>
      <table className="min-w-full bg-white rounded-lg shadow">
        <thead>
          <tr>
            <th className="px-4 py-2">Servicio</th>
            <th className="px-4 py-2">Fecha</th>
            <th className="px-4 py-2">Hora</th>
            <th className="px-4 py-2">Estado</th>
            <th className="px-4 py-2">Notas</th>
          </tr>
        </thead>
        <tbody>
          {reservas.map(reserva => (
            <tr key={reserva.Id}>
              <td className="px-4 py-2">{reserva.NombreProducto || 'No ingresado'}</td>
              <td className="px-4 py-2">{reserva.Fecha && reserva.Fecha.split('T')[0]}</td>
              <td className="px-4 py-2">{reserva.Hora}</td>
              <td className="px-4 py-2">{reserva.Estado}</td>
              <td className="px-4 py-2">{reserva.Notas}</td>
            </tr>
          ))}
        </tbody>
      </table>
      {reservas.length === 0 && <div className="mt-6 text-gray-500">No tienes reservas registradas.</div>}
    </div>
  );
};

export default ReservasUsuarios;