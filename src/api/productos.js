export async function obtenerProductos() {
//const res = await fetch('https://dev.matiivilla.cl:4000/api/productos');
  const res = await fetch('http://localhost:4000/api/productos');
  return await res.json();
}

export async function agregarProducto(producto) {
  const res = await fetch('http://localhost:4000/api/productos', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(producto)
  });
  if (!res.ok) {
    const error = await res.text();
    throw new Error(error);
  }
  return await res.json();
}


