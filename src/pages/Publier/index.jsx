import './publier.css';

import React from 'react';
import HeaderCustom from '../../components/HeaderCustom';
import CreerAnnonce from '../../components/CreerAnnonce';

function Publier() {
    return (
        <div>
            <HeaderCustom title="Créer une annonce"/>
            <CreerAnnonce/>
        </div>
    );


}



export default Publier;