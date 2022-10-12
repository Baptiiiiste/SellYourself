import './publier.css';

import React from 'react';
import HeaderCustom from '../../components/HeaderCustom';
import CreerAnnonce from '../../components/CreerAnnonce';
import Leftbar from '../../components/LeftBar';

function Publier() {
    return (
        <div className="Publier">
          <Leftbar/>
          <div className='Publier-center'>
            <HeaderCustom title="Creer une annonce"/>
            <CreerAnnonce/>
          </div>
  
      </div>
    );


}



export default Publier;