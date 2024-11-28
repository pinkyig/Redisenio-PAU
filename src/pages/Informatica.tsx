import React, { useState, useEffect } from "react";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import Alert from "react-bootstrap/Alert";
import FloatingLabel from "react-bootstrap/FloatingLabel";
import { Link } from "react-router-dom";

import "../index.css";

interface CardProps {
  title: string;
  text: string;
  buttonText: string;
  description: React.ReactNode;
}

const CustomCard: React.FC<CardProps> = ({
  title,
  text,
  buttonText,
  description,
}) => {
  const [show, setShow] = useState(false);
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [showAlert, setShowAlert] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [showConfirmModal, setShowConfirmModal] = useState(false);

  useEffect(() => {
    const previousApplications = JSON.parse(localStorage.getItem("applications") || "[]");
    const hasSubmitted = previousApplications.some((app: any) => app.title === title);
    setIsSubmitted(hasSubmitted);
  }, [title]);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const handleCheckboxChange = (option: string) => {
    setSelectedOption(option === selectedOption ? null : option);
  };

  const handleSubmit = () => {
    const application = {
      title,
      option: selectedOption,
      date: new Date().toISOString(), // Add the current date
    };

    const previousApplications = JSON.parse(localStorage.getItem("applications") || "[]");
    localStorage.setItem("applications", JSON.stringify([...previousApplications, application]));

    setShowAlert(true);
    setShow(false);
    setIsSubmitted(true);
  };

  const handleCancel = () => {
    const previousApplications = JSON.parse(localStorage.getItem("applications") || "[]");
    const updatedApplications = previousApplications.filter((app: any) => app.title !== title);
    localStorage.setItem("applications", JSON.stringify(updatedApplications));

    setShowAlert(false);
    setIsSubmitted(false);
    setShowConfirmModal(false);
  };

  return (
    <Card className="container mx-auto px-4 py-4 mt-4 mb-10">
      {showAlert && (
        <Alert
          variant="success"
          onClose={() => setShowAlert(false)}
          dismissible
        >
          Postulación enviada correctamente.
        </Alert>
      )}
      <Card.Body>
        <Card.Title className="font-semibold">{title}</Card.Title>
        <Card.Text>{text}</Card.Text>
        <div className="d-flex justify-content-end">
          {isSubmitted && (
            <Button variant="outline-danger" onClick={() => setShowConfirmModal(true)} className="me-2">
              Cancelar Postulación
            </Button>
          )}
          <Button
            variant={isSubmitted ? "secondary" : "primary"}
            onClick={handleShow}
            disabled={isSubmitted}
          >
            {isSubmitted ? "Postulación Enviada" : buttonText}
          </Button>
        </div>
      </Card.Body>

      <Modal show={show} onHide={handleClose} size="lg">
        <Modal.Header closeButton>
          <Modal.Title className="font-semibold">{title} - Formulario de Postulacion</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>{description}</p>
          <Form id="applicationForm">
            <Form.Group className="mb-3">
              <Form.Check
                type="radio"
                label="Cátedra"
                checked={selectedOption === "catedra"}
                onChange={() => handleCheckboxChange("catedra")}
                required
                name="option"
              />
              <Form.Check
                type="radio"
                label="Laboratorio"
                checked={selectedOption === "laboratorio"}
                onChange={() => handleCheckboxChange("laboratorio")}
                required
                name="option"
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
              <Form.Label>Motivaciones</Form.Label>
              <Form.Control as="textarea" rows={3} required />
            </Form.Group>
            <Form.Check type="checkbox" id="custom-checkbox" required>
              <Form.Check.Input type="checkbox" required />
              <Form.Check.Label>
                He leído el instructivo de ayudantías
              </Form.Check.Label>
              <Form.Control.Feedback
                type="valid"
                style={{
                  display: "block",
                  fontSize: "0.875em",
                  color: "#6c757d",
                }}
              >
                Asegúrate de leer completamente el instructivo antes de
                continuar{" "}
                <a
                  href="https://usmcl-my.sharepoint.com/:b:/g/personal/alejandro_rojo_usm_cl/EYmqNRjeJwxCn5HuKdmQ950BeipAGTTXmb77akpeb4Ec0Q?e=XPP5B0"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  aquí.
                </a>
              </Form.Control.Feedback>
            </Form.Check>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Cerrar
          </Button>
          <Button
            variant="primary"
            onClick={() => {
              const form = document.getElementById("applicationForm") as HTMLFormElement;
              if (form.checkValidity()) {
                handleSubmit();
              } else {
                form.reportValidity();
              }
            }}
          >
            Enviar Postulación
          </Button>
        </Modal.Footer>
      </Modal>

      <Modal show={showConfirmModal} onHide={() => setShowConfirmModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Confirmar Cancelación</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          ¿Estás seguro de que deseas cancelar tu postulación?
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowConfirmModal(false)}>
            No
          </Button>
          <Button variant="danger" onClick={handleCancel}>
            Sí, Cancelar
          </Button>
        </Modal.Footer>
      </Modal>
    </Card>
  );
};

const Postulaciones = () => {
  const [searchTerm, setSearchTerm] = useState("");

  const formatDescription = (text: string) => {
    return text.split("\n").map((line: string, i: number) => (
      <React.Fragment key={i}>
        {line}
        {i !== text.split("\n").length - 1 && <br />}
      </React.Fragment>
    ));
  };

  const ayudantias = [
    {
      title: "INF-239 Bases de datos",
      text: "Estudio de los fundamentos, diseño y gestión de bases de datos para almacenar, organizar y recuperar información de manera eficiente.",
      buttonText: "Postular a ayudantía",
      description: formatDescription(
        "Ayudante base de datos\n123 horas mensuales, 4 bloques de catedra semanales\nCrear y corregir tareas"
      ),
    },
    {
      title: "INF-280 Estadística Computacional",
      text: "Aplicación de métodos estadísticos y algoritmos computacionales para el análisis y procesamiento de grandes conjuntos de datos.",
      buttonText: "Postular a ayudantía",
      description: formatDescription(
        "Ayudante estadística computacional\n100 horas mensuales, 3 bloques de catedra semanales\nCrear y corregir tareas"
      ),
    },
    {
      title: "IWI-131 Programación",
      text: "Introducción a los conceptos y técnicas de programación para desarrollar aplicaciones mediante lenguajes de programación estructurados.",
      buttonText: "Postular a ayudantía",
      description: formatDescription(
        "Ayudante programación\n150 horas mensuales, 5 bloques de catedra semanales\nCrear y corregir tareas"
      ),
    },
  ];

  const filteredAyudantias = ayudantias.filter((ayudantia) =>
    ayudantia.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <>
      <h1 className="text-center mt-4 font-semibold">Ayudantias disponibles</h1>
      <div className="d-flex justify-content-center my-4">
        <FloatingLabel controlId="floatingInput" label="Buscar ayudantía...">
          <Form.Control
            type="text"
            placeholder="Buscar ayudantía..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            style={{ width: "400px" }}
          />
        </FloatingLabel>
      </div>
      {filteredAyudantias.length > 0 ? (
        filteredAyudantias.map((ayudantia, index) => (
          <CustomCard
            key={index}
            title={ayudantia.title}
            text={ayudantia.text}
            buttonText={ayudantia.buttonText}
            description={ayudantia.description}
          />
        ))
      ) : (
        <p className="text-center font-semibold">No se encontraron ayudantías.</p>
      )}
    </>
  );
};

export default Postulaciones;
