import './publier.css';
import Loader from '../../components/Loader/index'
import React, {useState, useEffect} from 'react';
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