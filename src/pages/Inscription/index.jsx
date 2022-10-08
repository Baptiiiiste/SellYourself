import "./Inscription.css"
import React from 'react';
import FormulaireInscription from '../../components/FormulaireInscription';
import HeaderCustom from '../../components/HeaderCustom';

function Inscription() {
  return(
    <div className="Inscription">
      <HeaderCustom title="logForm" className="Inscription-header"/>
      <div className='Inscription-bas'>
        <FormulaireInscription className="Inscription-form"/>
        <div className="Inscription-entrediv"></div>
        <div className="Inscription-image">
          <img className="Inscription-img-login" src={require('../../assets/signin.png')} alt=""/>
        </div>
      </div>
    </div>
  )
}

export default Inscription;
