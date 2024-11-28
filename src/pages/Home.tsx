import { Link } from "react-router-dom";
import Dropdown from "react-bootstrap/Dropdown";
import React, { useState } from "react";
import HeroImage from "../assets/fondo_sanjoaquin.png";

import "../index.css";

const Home = () => {
  const [selectedDepartment, setSelectedDepartment] = useState("");

  const handleDepartmentSelect = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedDepartment(e.target.value);
    console.log("Selected department:", e.target.value);
  };

  return (
    <div>
      {/* Hero Section con gradiente */}
      <div
        className="relative h-[550px] w-full bg-cover bg-center"
        style={{ backgroundImage: `url(${HeroImage})` }}
      >
        {/* Content Container */}
        <div className="container mx-auto px-4 h-full flex flex-col justify-center">
          <div className="max-w-3xl">
            <h1 className="text-5xl font-bold text-white mb-6">
              Bienvenido a PAU
            </h1>
            <p className="text-xl text-gray-200 mb-8">
              ¡Te damos la bienvenida a PAU, la Plataforma de Ayudantías
              Unificada! Aquí podrás seleccionar el departamento al cual deseas
              postular para una ayudantía.
            </p>

            {/* Dropdown con fondo blanco para mejor contraste */}
            <Dropdown className="d-inline mx-2">
              <Dropdown.Toggle
                id="dropdown-autoclose-true"
                className="bg-white border-0 hover:bg-gray-100"
                style={{ color: "#1e3a8a" }} // Estilo en línea para color del texto
              >
                Postula Aqui
              </Dropdown.Toggle>

              <Dropdown.Menu>
                <Dropdown.Item as={Link} to="/informatica">
                  Informática
                </Dropdown.Item>
                <Dropdown.Item as={Link} to="/matematicas">
                  Matemáticas
                </Dropdown.Item>
                <Dropdown.Item as={Link} to="/idp">
                  IDP
                </Dropdown.Item>
                <Dropdown.Item as={Link} to="/quimica">
                  Química
                </Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
          </div>
        </div>
      </div>
      {/* Additional Content Section */}
      <div className="container mx-auto px-4 py-12">
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {/* Feature Cards */}
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <h3 className="text-xl font-semibold mb-3">
              Explora Oportunidades
            </h3>
            <p className="text-gray-600">
              Descubre las diferentes opciones de ayudantías disponibles en cada
              departamento.
            </p>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-lg">
            <h3 className="text-xl font-semibold mb-3">Postula Fácilmente</h3>
            <p className="text-gray-600">
              Proceso simplificado de postulación para ayudantías en todos los
              departamentos.
            </p>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-lg">
            <h3 className="text-xl font-semibold mb-3">
              Seguimiento en Tiempo Real
            </h3>
            <p className="text-gray-600">
              Mantente informado sobre el estado de tus postulaciones a
              ayudantías.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
