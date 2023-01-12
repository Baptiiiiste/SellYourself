// Import
import './modifierAnnonce.css';
import React from 'react';
import HeaderCustom from '../../components/HeaderCustom';
import Leftbar from '../../components/LeftBar';
import ModifAnnonce from '../../components/ModifAnnonce';

// Page modifier une annonce
function ModifierAnnonce() {
  // Affichage HTML
  return (
    <div className="ModifierAnnonce">
      <Leftbar />
      <div className='ModifierAnnonce-center'>
        <div className='ModifierAnnonce-header'>
          <HeaderCustom title="Modifier annonce" />
        </div>
        <div className='ModifierAnnonce-nouveau'>
          <ModifAnnonce />
        </div>
      </div>
    </div>
  );
}



export default ModifierAnnonce;