import "./Annonce.css";
import React from 'react';
import HeaderCustom from "../../components/HeaderCustom";
import InfoAnnonce from "../../components/InfoAnnonce";
import LeftBar from "../../components/LeftBar";

function Annonce() {
    return (
        <div className='Annonce-GrosseBoite'>
            <LeftBar className='Annonce-LeftBar'/>
            <div className='Annonce-PetiteBoite'>
                <div className='Annonce-header'>
                    <HeaderCustom title="Annonce"/>
                </div> 
                <div className='Annonce-lesAnnonces'>
                    <InfoAnnonce />
                </div>
            </div>
        </div>
    )
}

export default Annonce;