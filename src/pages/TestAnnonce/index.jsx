import React from 'react';
import UneAnnonce from '../../components/UneAnnonce';


function TestAnnonce() {

  return(    
    <div className="TestAnnonce">
      <UneAnnonce titre='test annonce titre' 
                  description='test annonce description' 
                  prix={27} 
                  img_annonce='DefaultPP.jpeg' 
                  nom='test nom' 
                  prenom='test prenom' 
                  img_profil='DefaultPP.jpeg' 
                  note={45}/>
    </div>
  )
}

export default TestAnnonce;
