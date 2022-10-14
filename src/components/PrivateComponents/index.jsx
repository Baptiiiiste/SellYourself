import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';

function PrivateComponents() {

  const connectedUser = localStorage.getItem("user");

  return connectedUser ? <Outlet /> : <Navigate to="connexion" />
}

export default PrivateComponents;
