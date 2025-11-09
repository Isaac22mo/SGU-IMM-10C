import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getUsers } from "./services/UserService";
import UserTable from "./modules/users/UserTable.jsx";
import { Container, Button } from "react-bootstrap";

function App() {
  const [users, setUsers] = useState([]);
  const navigate = useNavigate();

  const fetchUsers = async () => {
    try {
      const res = await getUsers();
      setUsers(res.data);
    } catch (err) {
      console.error("Error al cargar usuarios:", err);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  return (
    <Container className="mt-5">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2 className="fw-bold">Gestión de Usuarios</h2>
        <Button variant="primary" onClick={() => navigate("/form")}>
          Registrar Usuario
        </Button>
      </div>
      <UserTable users={users} fetchUsers={fetchUsers} />
    </Container>
  );
}

export default App;
