import './Connexion.css';
import React from 'react';
import FormulaireConnexion from '../../components/FormulaireConnexion';
import HeaderCustom from '../../components/HeaderCustom';

// Page de connexion
function Connexion() {
  // Affichage HTML
  return(
    <div className="Connexion">
      <HeaderCustom title="logForm" className="Connexion-header"/>
      <div className='Connexion-bas'>
        <div className='Connexion-formulaire'>
          <FormulaireConnexion className="Connexion-form"/>
        </div>
        <div className="Connexion-image">
          <img className="Connexion-img-login" src={require('../../assets/login.png')} alt=""/>
        </div>
      </div>
    </div>
  )
}

export default Connexion;
