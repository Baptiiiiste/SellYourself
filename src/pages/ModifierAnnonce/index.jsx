import './modifierAnnonce.css';

import React from 'react';
import HeaderCustom from '../../components/HeaderCustom';
import CreerAnnonce from '../../components/CreerAnnonce';
import Leftbar from '../../components/LeftBar';
import ModifAnnonce from '../../components/ModifAnnonce';

function ModifierAnnonce() {
    return (
        <div className="ModifierAnnonce">
          <Leftbar/>
          <div className='ModifierAnnonce-center'>
              <div className='ModifierAnnonce-header'>
                <HeaderCustom title="Modifier annonce"/>
              </div> 
              <div className='ModifierAnnonce-nouveau'>
                <ModifAnnonce/>
              </div>
          </div>
  
      </div>
    );


}



export default ModifierAnnonce;