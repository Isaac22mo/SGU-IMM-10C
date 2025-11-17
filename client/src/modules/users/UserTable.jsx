import React, { useState, useEffect } from "react";
import { Table, Button, Modal, Form } from "react-bootstrap";
import { deleteUser, updateUser } from "../../services/UserService";

export default function UserTable({ users, fetchUsers }) {
  // Modal state
  const [showModal, setShowModal] = useState(false);
  const [editingUser, setEditingUser] = useState(null);

  // Form state
  const [formData, setFormData] = useState({
    nombre: "",
    apellido: "",
    correo: "",
    telefono: "",
  });

  // DELETE handler
  const handleDelete = async (id) => {
    if (!window.confirm("¿Eliminar este usuario?")) return;
    try {
      await deleteUser(id);
      fetchUsers();
    } catch (err) {
      console.error("Error al eliminar usuario:", err);
    }
  };

  // EDIT handler
  const handleEditClick = (user) => {
    setEditingUser(user);
    setFormData({
      nombre: user.nombre,
      apellido: user.apellido,
      correo: user.correo,
      telefono: user.telefono,
    });
    setShowModal(true);
  };

  // Input change
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // UPDATE handler
  const handleUpdate = async () => {
    try {
      await updateUser(editingUser.id, formData);
      setShowModal(false);
      fetchUsers();
    } catch (err) {
      console.error("Error al actualizar usuario:", err);
      alert("Error al actualizar");
    }
  };

  return (
    <>
      {/* TABLE */}
      <Table bordered hover responsive>
        <thead className="table-light">
          <tr>
            <th>Nombre</th>
            <th>Apellido</th>
            <th>Correo</th>
            <th>Teléfono</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {users.length === 0 ? (
            <tr>
              <td colSpan="5" className="text-center">
                No hay usuarios registrados
              </td>
            </tr>
          ) : (
            users.map((u) => (
              <tr key={u.id}>
                <td>{u.nombre}</td>
                <td>{u.apellido}</td>
                <td>{u.correo}</td>
                <td>{u.telefono}</td>
                <td className="d-flex gap-2">
                  <Button
                    variant="warning"
                    size="sm"
                    onClick={() => handleEditClick(u)}
                  >
                    Editar
                  </Button>

                  <Button
                    variant="danger"
                    size="sm"
                    onClick={() => handleDelete(u.id)}
                  >
                    Eliminar
                  </Button>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </Table>

      {/* MODAL */}
      <Modal show={showModal} onHide={() => setShowModal(false)} centered>
        <Modal.Header closeButton>
          <Modal.Title>Editar Usuario</Modal.Title>
        </Modal.Header>

        <Modal.Body>
          <Form>
            <Form.Group className="mb-2">
              <Form.Label>Nombre</Form.Label>
              <Form.Control
                name="nombre"
                value={formData.nombre}
                onChange={handleChange}
              />
            </Form.Group>

            <Form.Group className="mb-2">
              <Form.Label>Apellido</Form.Label>
              <Form.Control
                name="apellido"
                value={formData.apellido}
                onChange={handleChange}
              />
            </Form.Group>

            <Form.Group className="mb-2">
              <Form.Label>Correo</Form.Label>
              <Form.Control
                name="correo"
                type="email"
                value={formData.correo}
                onChange={handleChange}
              />
            </Form.Group>

            <Form.Group className="mb-2">
              <Form.Label>Teléfono</Form.Label>
              <Form.Control
                name="telefono"
                value={formData.telefono}
                onChange={handleChange}
              />
            </Form.Group>
          </Form>
        </Modal.Body>

        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowModal(false)}>
            Cancelar
          </Button>
          <Button variant="primary" onClick={handleUpdate}>
            Guardar cambios
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}
