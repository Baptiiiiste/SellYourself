import "./Annonce.css";
import React from 'react';
import HeaderCustom from "../../components/HeaderCustom";
import InfoAnnonce from "../../components/InfoAnnonce";
import LeftBar from "../../components/LeftBar";

function Annonce() {
    return (
        <div className='Annonce-GrosseBoite'>
            <LeftBar/>
            <div className='Annonce-PetiteBoite'>
                <HeaderCustom title="Annonce"/>
                <InfoAnnonce/>
            </div>
        </div>
    )
}

export default Annonce;