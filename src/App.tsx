import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import NavbarComponent from "./components/Navbar";
import Footer from "./components/Fotter"; // Asegúrate que el nombre del archivo es Footer.jsx
import Home from "./pages/Home";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Profile from "./pages/Profile";
import Informatica from "./pages/Informatica";
import Resultados from "./pages/Resultados";
import Idp from "./pages/Idp";
import Matematicas from "./pages/Matematicas";
import Quimica from "./pages/Quimica";
import Profilepicture from "./assets/IMG_7631.jpg";

function App() {
  return (
    <Router>
      <div className="flex flex-col min-h-screen">
        <NavbarComponent />
        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
            <Route
              path="/profile"
              element={
                <Profile
                  name="Camila Rosales"
                  rut="20.562.694-8"
                  email="camila.rosales@usm.cl"
                  rol="202173631-k"
                  carreer="Ing. Civil Informatica"
                  profilePicture={Profilepicture}
                />
              }
            />
            <Route path="/informatica" element={<Informatica />} />
            <Route path="/resultados" element={<Resultados />} />
            <Route path="/idp" element={<Idp />} />
            <Route path="/matematicas" element={<Matematicas />} />
            <Route path="/quimica" element={<Quimica />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
