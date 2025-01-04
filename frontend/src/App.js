import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./Components/Navbar/Navbar.jsx";
import Contact from "./Components/Contact/Contact.jsx";
import About from "./Components/About/About.jsx";
import CreateReplica from "./Components/CreateReplica/CreateReplica.jsx";
import Pricing from "./Components/Pricing/Pricing.jsx";
import Replica from "./Components/Replica/Replica.jsx";
import Auth from "./Components/Auth/Auth.jsx";

const App = () => {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<About />} />
        <Route path="/pricing" element={<Pricing />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/replica" element={<Replica />} />
        <Route path="/createReplica" element={<CreateReplica />} />
        <Route path="/auth" element={<Auth />} />
      </Routes>
    </Router>
  );
};

export default App;
