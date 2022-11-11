import "./Profil.css";
import {useState} from 'react';
import { Link } from 'react-router-dom';
import HeaderCustom from "../../components/HeaderCustom";
import InfoUtilisateur from "../../components/InfoUtilisateur";
import LeftBar from "../../components/LeftBar";
import { useEffect } from "react";
import AnnonceProfil from "../../components/AnnonceProfil";




function Profil() {

    let connectedUser = sessionStorage.getItem("user");

    const getUserAds = async () => {
        let annonces = await fetch(`http://localhost:5000/api/utilisateur/getAnnonces/${JSON.parse(connectedUser).pseudo}`, {
            method: "Get",
            headers: {
                'Content-Type': 'Application/json'
            }
        });
        annonces = annonces.json();
        return annonces;
    }

    let annonces = [];
    getUserAds().then(e => {
        for(let i in Object.keys(e)){
            annonces.push(e[i]);
        }
    });
    console.log("---------------------------------------------------------")
    console.log()

    

    // useEffect(() => {

    // }, [connectedUser])


    return (
        <div className='Profil'>
            <LeftBar />
            <div className='Profil-center'>
                <div className="Profil-header">
                    <HeaderCustom title="Profil" />
                </div>
                <div className="Profil-info">
                    <InfoUtilisateur />
                    <div className="Profil-annonces">
                        {annonces.map(({ titre, description, prix, img }, index) => (
                            <AnnonceProfil titre={titre}
                                description={description}
                                prix={prix}
                                img_annonce={img}
                                key={index}

                            />

                        ))}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Profil;