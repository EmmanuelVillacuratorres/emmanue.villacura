export async function registrarUsuario({ nombreUsuario, password, correo, Rol }) {
// const res = await fetch('https://dev.matiivilla.cl:4000/api/usuarios', {
   const res = await fetch('http://localhost:4000/api/usuarios', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      NombreUsuario: nombreUsuario,
      HashPassword: password,
      Correo: correo,
      Rol: Rol || "usuario" // Por defecto "usuario"
    })
  });
  return await res.json();
}

export async function obtenerUsuarios() {
// const res = await fetch('https://dev.matiivilla.cl:4000/api/usuarios');
     const res = await fetch('http://localhost:4000/api/usuarios');
  return await res.json();
}

export async function eliminarUsuario(id) {
//  const res = await fetch(`https://dev.matiivilla.cl:4000/api/usuarios/${id}`, {
  const res = await fetch(`http://localhost:4000/api/usuarios/${id}`, {
    method: 'DELETE'
  });
  return await res.json();
}

export async function loginUsuario({ username, password }) {
//  const res = await fetch('https://dev.matiivilla.cl:4000/api/usuarios/login', {
   const res = await fetch('http://localhost:4000/api/usuarios/login', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ username, password })
  });
  return await res.json();
}