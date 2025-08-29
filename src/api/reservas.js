export async function crearReserva(reserva) {
  const res = await fetch('http://localhost:4000/api/reservas', {
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
  const res = await fetch('http://localhost:4000/api/reservas');
  if (!res.ok) {
    const error = await res.text();
    throw new Error(error);
  }
  return await res.json();
}

export async function cambiarEstadoReserva(id, estado) {
  const res = await fetch(`http://localhost:4000/api/reservas/${id}/estado`, {
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