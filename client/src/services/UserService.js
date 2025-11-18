// ✅ Variables de entorno (.env)
// VITE_API_HOST=localhost
// VITE_API_PORT=8080
// VITE_API_BASE=/api/users/

const ENV = import.meta.env;
const API_URL = `${ENV.VITE_API_PROTOCOL}://${ENV.VITE_API_HOST}:${ENV.VITE_API_PORT}${ENV.VITE_API_BASE}`;

// 🔹 Obtener todos los usuarios
export const getUsers = async () => {
  const res = await fetch(API_URL);
  const data = await res.json();
  return data.data || data; // tu backend devuelve ApiResponse con "data"
};

// 🔹 Obtener usuario por ID
export const getUserById = async (id) => {
  const res = await fetch(`${API_URL}${id}`);
  const data = await res.json();
  return data.data || data;
};

// 🔹 Crear nuevo usuario
export const createUser = async (user) => {
  const res = await fetch(API_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(user),
  });
  return res.ok;
};

// 🔹 Actualizar usuario existente
export const updateUser = async (id, user) => {
  const res = await fetch(`${API_URL}${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(user),
  });
  return res.ok;
};

// 🔹 Eliminar usuario
export const deleteUser = async (id) => {
  const res = await fetch(`${API_URL}${id}`, { method: "DELETE" });
  return res.ok;
};
