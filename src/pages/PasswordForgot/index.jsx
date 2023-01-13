import './PasswordForgot.css';
import React from 'react';
import FormulairePwdForgot from '../../components/FormulairePwdForgot';
import HeaderCustom from '../../components/HeaderCustom';

function PwdForgot() {
  return(
    <div className="PwdForgot">
      <HeaderCustom title="logForm" className="PwdForgot-header"/>
      <div className='PwdForgot-bas'>
        <div className='PwdForgot-formulaire'>
          <FormulairePwdForgot className="PwdForgot-form"/>
        </div>
        <div className="PwdForgot-image">
          <img className="PwdForgot-img-login" src={require('../../assets/password_forgot.png')} alt=""/>
        </div>
      </div>
    </div>
  )
}

export default PwdForgot;