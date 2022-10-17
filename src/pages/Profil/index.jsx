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
                <div className="Profil-header">
                    <HeaderCustom title="Profil"/>
                </div>
                <div className="Profil-info">
                    <ProfilUtilisateur/>
                </div>
            </div>
        </div>
    )
}

export default Profil;