import React from "react";
import {BrowserRouter, Route, Routes} from "react-router-dom";
import Navbar from "./components/Navbar.jsx";
import Home from "./pages/Home.jsx";
import About from "./pages/About.jsx";
import API from "./pages/API.jsx";
import Footer from "./components/Footer.jsx";
import NotFound from "./pages/NotFound.jsx";

function App() {

  return (
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="/home" element={<Home />} />
          <Route path="/api_page" element={<API />} />
          <Route path="/about" element={<About />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
        <Footer />
      </BrowserRouter>
  )
}

export default App
