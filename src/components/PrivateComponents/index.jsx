// Import 
import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';

// Composant pour rediriger vers la connection
function PrivateComponents() {
  // Variable
  const connectedUser = sessionStorage.getItem("user");

  // Affichage HTML
  return connectedUser ? <Outlet /> : <Navigate to="connexion" />
}

export default PrivateComponents;
