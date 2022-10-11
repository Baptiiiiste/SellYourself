import './TestAnnonce.css';
import React from 'react';
import UneAnnonce from '../../components/UneAnnonce';
import HeaderCategories from '../../components/HeaderCategories';
import HeaderCustom from '../../components/HeaderCustom';
import LeftBar from '../../components/LeftBar';

function TestAnnonce() {

  return(    
    <div className="TestAnnonce">
      <LeftBar/>
      <div className='TestAnnonce-center'>
        <HeaderCustom title="homePage"/>
        <HeaderCategories/>
        <UneAnnonce titre='test annonce titre' 
                    description='oooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooo' 
                    prix={27} 
                    img_annonce='DefaultPP.jpeg' 
                    nom='test nom' 
                    prenom='test prenom' 
                    img_profil='DefaultPP.jpeg' 
                    note={4.5}/>
        </div>
    </div>
  )
}

export default TestAnnonce;
