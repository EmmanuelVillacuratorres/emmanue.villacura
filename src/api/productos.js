const API_URL = 'https://dev.matiivilla.cl/emma/api/Productos';

export async function obtenerProductos() {
  const res = await fetch(API_URL);
  return await res.json();
}

export async function agregarProducto(producto) {
  const res = await fetch(API_URL, {
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

export async function editarProducto(id, producto) {
  const res = await fetch(`${API_URL}/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(producto)
  });
  if (!res.ok) {
    const error = await res.text();
    throw new Error(error);
  }
  return await res.json();
}

export async function cambiarDisponibilidadProducto(id, disponible) {
  const res = await fetch(`${API_URL}/${id}/disponible`, {
    method: 'PATCH',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ Disponible: disponible })
  });
  if (!res.ok) {
    const error = await res.text();
    throw new Error(error);
  }
  return await res.json();
}


