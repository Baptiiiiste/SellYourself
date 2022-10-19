import './validation.css';
import React from 'react';
import Validation from '../../components/PageValider';
import HeaderCustom from '../../components/HeaderCustom';

function ValiderAchat() {
  return(
    <div className="Achat">
      <HeaderCustom title="logForm" className="Achat-header"/>
      <div className='Achat-bas'>
        <div className='Achat-formulaire'>
          <Validation className="Achat-form"/>
        </div>
        <div className="Achat-image">
          <img className="Achat-img-login" src={require('../../assets/Credit.png')} alt=""/>
        </div>
      </div>
    </div>
  )
}

export default ValiderAchat;
