import './Connexion.css';
import React from 'react';
import FormulaireConnexion from '../../components/FormulaireConnexion';
import HeaderCustom from '../../components/HeaderCustom';

function Connexion() {
  return(
    <div className="Connexion">
      <HeaderCustom title="logForm"/>
      <div className='Connexion-bas'>
        <FormulaireConnexion className="Connexion-form"/>
        <div className="Connexion-entrediv"></div>
        <div className="Connexion-image">
          <img src={require('../../assets/login.png')} alt=""/>
        </div>
      </div>
      
    </div>
  )
}

export default Connexion;
