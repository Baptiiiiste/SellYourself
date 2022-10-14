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
                    <InfoAnnonce nom={"Thomas Pasquet"} 
                                note={4.4} 
                                descriptionVendeur={"Je suis une description vendeur"} 
                                localisation={"Paris"} 
                                image={"test"} 
                                titre={"Titre de l'annonce ici"} 
                                descriptionAnnonce={"Je suis une description annonce OOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOO"} 
                                photos={"test"} 
                                prix={27.5}/>
                </div>
            </div>
        </div>
    )
}

export default Annonce;