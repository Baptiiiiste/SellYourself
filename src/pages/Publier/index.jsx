// Import
import './publier.css';
import React from 'react';
import HeaderCustom from '../../components/HeaderCustom';
import CreerAnnonce from '../../components/CreerAnnonce';
import Leftbar from '../../components/LeftBar';

// Page pour poster une annonce
function Publier() {
  return (
    <div className="Publier">
      <Leftbar />
      <div className='Publier-center'>
        <div className='Publier-header'>
          <HeaderCustom title="Nouvelle annonce" />
        </div>
        <div className='Publier-nouveau'>
          <CreerAnnonce />
        </div>
      </div>
    </div>
  );
}

export default Publier;