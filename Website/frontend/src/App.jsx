import React from "react";
import {BrowserRouter, Route, Routes} from "react-router-dom";
import Navbar from "./components/Navbar/Navbar.jsx";
import Home from "./pages/Home/Home.jsx";
import About from "./pages/About/About.jsx";
import API from "./pages/API.jsx";
import NotFound from "./pages/NotFound.jsx";
import NOVA from "./pages/NOVA.jsx";

import "./App.css"

function App() {

  return (
      <BrowserRouter>
          <div className="app-container">
              <Navbar/>
              <Routes>
                  <Route path="/" element={<Home/>}/>
                  <Route path="/api" element={<API/>}/>
                  <Route path="/about" element={<About/>}/>

                  <Route path="*" element={<NotFound/>}/>

                  <Route path="/nova" element={<NOVA/>}/>
              </Routes>
          </div>
      </BrowserRouter>
)
}

export default App
