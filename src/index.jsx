import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import Home from './pages/Home/index';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import Connexion from './pages/Connexion';
import Inscription from './pages/Inscription';


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Router>

      <Routes>
        <Route path="/" element={<Home/>} />
        <Route path="/connexion" element={<Connexion/>} />
        <Route path="/inscription" element={<Inscription/>} />
        <Route path="/*" element={<p> 404 </p>} />
      </Routes>

    </Router>
  </React.StrictMode>
);

