import React, { useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import "../index.css";

interface Application {
  title: string;
  option: string | null;
  date: string; // Fecha de postulación
  priority: number; // Nueva propiedad de prioridad
}

interface CardProps {
  title: string;
  text: string;
  option: string | null;
  acceptButtonText: string;
  rejectButtonText: string;
  initialStatus: string;
  priority: number;
  onIncreasePriority: () => void;
  onDecreasePriority: () => void;
}

const CustomCard: React.FC<CardProps> = ({
  title,
  text,
  option,
  acceptButtonText,
  rejectButtonText,
  initialStatus,
  priority,
  onIncreasePriority,
  onDecreasePriority,
}) => {
  const [status, setStatus] = useState(initialStatus);

  useEffect(() => {
    if (priority === 1) {
      const timer = setTimeout(() => {
        setStatus("accepted");
      }, 10000);

      return () => clearTimeout(timer);
    }
  }, [priority]);

  useEffect(() => {
    if (priority === 2) {
      const timer = setTimeout(() => {
        setStatus("accepted");
      }, 20000);

      return () => clearTimeout(timer);
    }
  }, [priority]);

  const handleAccept = () => {
    setStatus("ayudantia aceptada");
  };

  const handleReject = () => {
    setStatus("ayudantia rechazada");
  };

  const renderStatus = () => {
    switch (status) {
      case "rejected":
        return (
          <Card.Text className="text-danger">POSTULACIÓN RECHAZADA</Card.Text>
        );
      case "pending":
        return <Card.Text className="text-secondary">PENDIENTE</Card.Text>;
      case "accepted":
        return <Card.Text className="text-success">ACEPTADO</Card.Text>;
      case "ayudantia aceptada":
        return (
          <Card.Text className="text-success">AYUDANTIA ACEPTADA</Card.Text>
        );
      case "ayudantia rechazada":
        return (
          <Card.Text className="text-danger">AYUDANTIA RECHAZADA</Card.Text>
        );
      default:
        return null;
    }
  };

  return (
    <Card className="container mx-auto px-4 py-4 mt-4 mb-10">
      <Card.Body>
        <Card.Title>{title}</Card.Title>
        <Card.Text>{text}</Card.Text>
        <Card.Text>Postulacion a {option || "No especificada"}</Card.Text>
        <Card.Text>Prioridad: {priority}</Card.Text>
        <Card.Text>Estado: {renderStatus()}</Card.Text>
        <div className="d-flex justify-content-between">
          <div>
            <Button variant="outline-secondary" onClick={onIncreasePriority}>
              ↑
            </Button>
            <Button
              variant="outline-secondary"
              onClick={onDecreasePriority}
              className="ms-2"
            >
              ↓
            </Button>
          </div>
          {status !== "rejected" &&
            status !== "pending" &&
            status !== "ayudantia rechazada" && (
              <div className="d-flex justify-content-end">
                <Button
                  variant="outline-danger"
                  className="me-2"
                  onClick={handleReject}
                >
                  {rejectButtonText}
                </Button>
                {status !== "ayudantia aceptada" && (
                  <Button variant="outline-primary" onClick={handleAccept}>
                    {acceptButtonText}
                  </Button>
                )}
              </div>
            )}
        </div>
      </Card.Body>
    </Card>
  );
};

const Resultados: React.FC = () => {
  const [applications, setApplications] = useState<Application[]>([]);

  useEffect(() => {
    // Recuperar las postulaciones del localStorage
    const storedApplications = JSON.parse(
      localStorage.getItem("applications") || "[]"
    );
    setApplications(storedApplications);
  }, []);

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return isNaN(date.getTime())
      ? "Fecha no disponible"
      : date.toLocaleDateString();
  };

  const handleIncreasePriority = (index: number) => {
    if (index > 0) {
      const newApplications = [...applications];
      [newApplications[index], newApplications[index - 1]] = [
        newApplications[index - 1],
        newApplications[index],
      ];
      setApplications(newApplications);
      localStorage.setItem("applications", JSON.stringify(newApplications));
    }
  };

  const handleDecreasePriority = (index: number) => {
    if (index < applications.length - 1) {
      const newApplications = [...applications];
      [newApplications[index], newApplications[index + 1]] = [
        newApplications[index + 1],
        newApplications[index],
      ];
      setApplications(newApplications);
      localStorage.setItem("applications", JSON.stringify(newApplications));
    }
  };

  return (
    <>
      <h1 className="text-center mt-4 font-semibold">
        Resultados de Postulación
      </h1>
      {applications.length > 0 ? (
        applications
          .sort((a, b) => b.priority - a.priority)
          .map((app, index) => (
            <CustomCard
              key={`${app.title}-${app.priority}`} // Clave única basada en el título y la prioridad
              title={app.title}
              text={`Fecha de postulación: ${formatDate(app.date)}`}
              option={app.option}
              acceptButtonText="Aceptar Ayudantía"
              rejectButtonText="Rechazar Ayudantía"
              initialStatus="pending" // Estado inicial de cada tarjeta
              priority={index + 1} // Mostrar la prioridad basada en la posición en la lista
              onIncreasePriority={() => handleIncreasePriority(index)}
              onDecreasePriority={() => handleDecreasePriority(index)}
            />
          ))
      ) : (
        <p className="text-center font-semibold text-gray-500 mt-4">
          No hay postulaciones guardadas.
        </p>
      )}
    </>
  );
};

export default Resultados;
