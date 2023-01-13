// Import
import './ResetPassword.css';
import React from 'react';
import FormulaireResetPassword from '../../components/FormulaireResetPassword';
import HeaderCustom from '../../components/HeaderCustom';

// Page pour réinitialiser le mot de passe
function ResetPassword(){
  // Affichage HTML
  return(
    <div className="ResetPassword">
      <HeaderCustom title="logForm" className="ResetPassword-header"/>
      <div className='ResetPassword-bas'>
        <div className='ResetPassword-formulaire'>
          <FormulaireResetPassword className="ResetPassword-form"/>
        </div>
        <div className="ResetPassword-image">
          <img className="ResetPassword-img-login" src={require('../../assets/reset_password.png')} alt=""/>
        </div>
      </div>
    </div>
  )
}

export default ResetPassword;