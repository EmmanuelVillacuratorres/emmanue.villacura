export async function obtenerProductos() {
//const res = await fetch('https://dev.matiivilla.cl:4000/api/productos');
  const res = await fetch('http://localhost:4000/api/productos');
  return await res.json();
}


