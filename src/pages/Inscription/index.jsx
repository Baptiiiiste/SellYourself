// Import
import "./Inscription.css"
import React from 'react';
import FormulaireInscription from '../../components/FormulaireInscription';
import HeaderCustom from '../../components/HeaderCustom';

// Page inscription
function Inscription() {
  // Fonction pour recharger la page
  const reloadPage = () => {
    var currentDocumentTimestamp = new Date(performance.timing.domLoading).getTime();
    var now = Date.now();
    var tenSec = 1 * 1000;
    var plusTenSec = currentDocumentTimestamp + tenSec;
    if (now > plusTenSec) {
      window.location.reload();
    }
  }

  reloadPage();

  // Affichage HTML
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
