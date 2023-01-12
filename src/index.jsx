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
import PrivateComponents from './components/PrivateComponents/index.jsx'
import Messages from './pages/Messages';
import Favoris from './pages/Favoris';
import Conversation from './pages/Conversation';
import Erreur from './pages/404';
import ValiderAchat from './pages/ValiderAchat';
import Categorie from './pages/Categorie';
import ModifierAnnonce from './pages/ModifierAnnonce';

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <React.StrictMode>
    <Router>

      <Routes>
        <Route path="/" element={<Home/>} />
        <Route path="/search/:categorie/:recherche" element={<Categorie/>} />

        <Route element={<PrivateComponents/>}>
          <Route path="/annonce/:utilisateur/:annonce" element={<Annonce/>} />
          <Route path="/publier" element={<Publier/>} />
          <Route path="/notifications" element={<Notification/>} />
          <Route path="/profil" element={<Profil/>} />
          <Route path="/messages" element={<Messages/>} />
          <Route path="/favoris" element={<Favoris/>} />
          <Route path='/validation/:utilisateur/:annonce' element={<ValiderAchat/>} />
          <Route path='/modifier/:annonce' element={<ModifierAnnonce/>} />
          <Route path='/chat/:annonce/:vendeur/:acheteur' element={<Conversation/>} />
        </Route>
        
        <Route path="/inscription" element={<Inscription/>} />
        <Route path="/connexion" element={<Connexion/>} />
        <Route path="/*" element={<Erreur/>} />
      </Routes>

    </Router>

  </React.StrictMode>
);


