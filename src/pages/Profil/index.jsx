import "./Profil.css";
import React from 'react';
import HeaderCustom from "../../components/HeaderCustom";
import ProfilUtilisateur from "../../components/ProfilUtilisateur";
import LeftBar from "../../components/LeftBar";

function Profil() {
    return (
        <div className='Profil'>
            <LeftBar/>
            <div className='Profil-center'>
                <HeaderCustom title="Profil"/>
                <ProfilUtilisateur className='ProfilUtilisateur'/>
            </div>
        </div>
    )
}

export default Profil;