import "./Inscription.css"
import React from 'react';
import FormulaireInscription from '../../components/FormulaireInscription';
import HeaderCustom from '../../components/HeaderCustom';
import { useEffect } from "react";

function reloadPage() {
  var currentDocumentTimestamp = new Date(performance.timing.domLoading).getTime();
  // Current Time //
  var now = Date.now();
  // Total Process Lenght as Minutes //
  var tenSec = 1 * 100;
  // End Time of Process //
  var plusTenSec = currentDocumentTimestamp + tenSec;
  if (now > plusTenSec) {
    window.location.reload();
  }
}

function Inscription() {

  // useEffect(()=>{
  //     if( window.sessionStorage )
  //     {
  //       if( sessionStorage.getItem('firstLoad') !== 'true')
  //       {
  //         sessionStorage['firstLoad'] = 'true';
  //         window.location.reload(false);
  //       }  
  //     }
  // },[])


  reloadPage();
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
