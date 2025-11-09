import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { createUser } from "../../services/UserService";
import { Container, Form, Button, Row, Col, Card } from "react-bootstrap";

export default function UserForm() {
  const [user, setUser] = useState({
    nombre: "",
    apellido: "",
    correoElectronico: "",
    numeroTelefono: "",
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await createUser(user);
      navigate("/"); // volver a la tabla
    } catch (err) {
      console.error("Error al guardar usuario:", err);
    }
  };

  return (
    <Container className="mt-5">
      <Card className="p-4 shadow-sm">
        <h3 className="mb-4 text-center">Registrar Nuevo Usuario</h3>
        <Form onSubmit={handleSubmit}>
          <Row>
            <Col md={6}>
              <Form.Group className="mb-3">
                <Form.Label>Nombre</Form.Label>
                <Form.Control
                  type="text"
                  name="nombre"
                  value={user.nombre}
                  onChange={handleChange}
                  placeholder="Ingrese el nombre"
                  required
                />
              </Form.Group>
            </Col>

            <Col md={6}>
              <Form.Group className="mb-3">
                <Form.Label>Apellido</Form.Label>
                <Form.Control
                  type="text"
                  name="apellido"
                  value={user.apellido}
                  onChange={handleChange}
                  placeholder="Ingrese el apellido"
                  required
                />
              </Form.Group>
            </Col>
          </Row>

          <Form.Group className="mb-3">
            <Form.Label>Correo Electrónico</Form.Label>
            <Form.Control
              type="email"
              name="correoElectronico"
              value={user.correoElectronico}
              onChange={handleChange}
              placeholder="correo@ejemplo.com"
              required
            />
          </Form.Group>

          <Form.Group className="mb-4">
            <Form.Label>Número de Teléfono</Form.Label>
            <Form.Control
              type="text"
              name="numeroTelefono"
              value={user.numeroTelefono}
              onChange={handleChange}
              placeholder="Ej. 555-123-4567"
              required
            />
          </Form.Group>

          <div className="d-flex justify-content-between">
            <Button variant="secondary" onClick={() => navigate("/")}>
              Cancelar
            </Button>
            <Button variant="success" type="submit">
              Guardar Usuario
            </Button>
          </div>
        </Form>
      </Card>
    </Container>
  );
}
