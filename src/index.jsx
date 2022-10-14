import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import Home from './pages/Home/index';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import Connexion from './pages/Connexion';
import Annonce from './pages/Annonce';
import Inscription from './pages/Inscription';
import Publier from './pages/Publier';
import Notification from './pages/Notification';
import Profil from './pages/Profil';
import TestAnnonce from './pages/TestAnnonce'



const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Router>

      <Routes>
        <Route path="/" element={<Home/>} />
        <Route path="/connexion" element={<Connexion/>} />
        <Route path="/annonce" element={<Annonce/>} />
        <Route path="/inscription" element={<Inscription/>} />
        <Route path="/publier" element={<Publier/>} />
        <Route path="/test" element={<TestAnnonce/>} />
        <Route path="/test2" element={<TestAnnonce/>} />
        <Route path="/notification" element={<Notification/>} />
        <Route path="/profil" element={<Profil/>} />

        <Route path="/*" element={<p> 404 </p>} />
      </Routes>

    </Router>
  </React.StrictMode>
);


