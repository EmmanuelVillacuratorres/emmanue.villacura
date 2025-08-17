import React, { useEffect, useState } from 'react';
import { obtenerUsuarios, eliminarUsuario } from '../api/usuarios';

const UsuariosList = () => {
  const [usuarios, setUsuarios] = useState([]);
  const [loading, setLoading] = useState(true);

  const cargarUsuarios = async () => {
    setLoading(true);
    const data = await obtenerUsuarios();
    console.log(data); // Verifica que los datos se obtienen correctamente
    setUsuarios(data);
    setLoading(false);
  };

  useEffect(() => {
    cargarUsuarios();
  }, []);

  const handleEliminar = async (id) => {
    if (window.confirm('¿Seguro que deseas eliminar este usuario?')) {
      await eliminarUsuario(id);
      cargarUsuarios();
    }
  };

  if (loading) return <div>Cargando usuarios...</div>;

  return (
    <div className="max-w-2xl mx-auto mt-8 bg-white p-6 rounded-xl shadow">
      <h2 className="text-xl font-bold mb-4">Usuarios Registrados</h2>
      <table className="w-full border">
        <thead>
          <tr>
            <th className="border px-2 py-1">Usuario</th>
            <th className="border px-2 py-1">Correo</th>
            <th className="border px-2 py-1">Rol</th>
            <th className="border px-2 py-1">Fecha de creación</th>
            <th className="border px-2 py-1">Acciones</th>
          </tr>
        </thead>
        <tbody>
          {usuarios.map(u => (
            <tr key={u.Id}>
              <td className="border px-2 py-1">{u.NombreUsuario}</td>
              <td className="border px-2 py-1">{u.Correo}</td>
              <td className="border px-2 py-1">{u.Rol}</td>
              <td className="border px-2 py-1">{new Date(u.CreadoEn).toLocaleString()}</td>
              <td className="border px-2 py-1">
                <button
                  className="bg-red-500 text-white px-2 py-1 rounded"
                  onClick={() => handleEliminar(u.Id)}
                >
                  Eliminar
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default UsuariosList;