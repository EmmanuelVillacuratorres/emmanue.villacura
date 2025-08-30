const API_URL = 'https://api-backend-2v0a.onrender.com/api/Reservas';

export async function crearReserva(reserva) {
  const res = await fetch(API_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(reserva)
  });
  if (!res.ok) {
    const error = await res.text();
    throw new Error(error);
  }
  return await res.json();
}

export async function obtenerReservas() {
  const res = await fetch(API_URL);
  if (!res.ok) {
    const error = await res.text();
    throw new Error(error);
  }
  return await res.json();
}

export async function cambiarEstadoReserva(id, estado) {
  const res = await fetch(`${API_URL}/${id}/estado`, {
    method: 'PATCH',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ Estado: estado })
  });
  if (!res.ok) {
    const error = await res.text();
    throw new Error(error);
  }
  return await res.json();
}