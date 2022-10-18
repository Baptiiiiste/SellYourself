import "./Inscription.css"
import React from 'react';
import FormulaireInscription from '../../components/FormulaireInscription';
import HeaderCustom from '../../components/HeaderCustom';

function Inscription() {
  return(
    <div className="Inscription">
      <HeaderCustom title="logForm" className="Inscription-header"/>
      <div className='Inscription-bas'>
        <div className='Inscription-formulaire'>
          <FormulaireInscription className="Inscription-form"/>
        </div>
        <div className="Inscription-image">
          <img className="Inscription-img-login" src={require('../../assets/signin.png')} alt=""/>
        </div>
      </div>
    </div>
  )
}

export default Inscription;
