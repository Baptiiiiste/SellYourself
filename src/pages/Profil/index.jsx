import "./Profil.css";
import {useState} from 'react';
import { Link } from 'react-router-dom';
import HeaderCustom from "../../components/HeaderCustom";
import InfoUtilisateur from "../../components/InfoUtilisateur";
import LeftBar from "../../components/LeftBar";
import { useEffect } from "react";
import AnnonceProfil from "../../components/AnnonceProfil";


const annonces = [
    { titre: "titre de l'annonce", description: "bla bla bla", prix: 27, img_annonce: "annonce1.jpg" },
    { titre: "titre de l'annonce", description: "bla bla bla", prix: 27, img_annonce: "annonce1.jpg" },
    { titre: "titre de l'annonce", description: "bla bla bla", prix: 27, img_annonce: "annonce1.jpg" },
    { titre: "titre de l'annonce", description: "bla bla bla", prix: 27, img_annonce: "annonce1.jpg" },
    { titre: "titre de l'annonce", description: "bla bla bla", prix: 27, img_annonce: "annonce1.jpg" },
    { titre: "titre de l'annonce", description: "bla bla bla", prix: 27, img_annonce: "annonce1.jpg" },
    { titre: "titre de l'annonce", description: "bla bla bla", prix: 27, img_annonce: "annonce1.jpg" },
    { titre: "titre de l'annonce", description: "bla bla bla", prix: 27, img_annonce: "annonce1.jpg" },
    { titre: "titre de l'annonce", description: "bla bla bla", prix: 27, img_annonce: "annonce1.jpg" },
    { titre: "titre de l'annonce", description: "bla bla bla", prix: 27, img_annonce: "annonce1.jpg" },
    { titre: "titre de l'annonce", description: "bla bla bla", prix: 27, img_annonce: "annonce1.jpg" },
    { titre: "titre de l'annonce", description: "bla bla bla", prix: 27, img_annonce: "annonce1.jpg" },
    { titre: "titre de l'annonce", description: "bla bla bla", prix: 27, img_annonce: "annonce1.jpg" },
    { titre: "titre de l'annonce", description: "OOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOO", prix: 27, img_annonce: "annonce1.jpg" },
]


let connectedUser = sessionStorage.getItem("user");

 const getUserAds = async () => {
     let annonces = await fetch(`http://localhost:5000/api/utilisateur/getAds/${JSON.parse(connectedUser)._id}`, {
         method: "Get",
         headers: {
             'Content-Type': 'Application/json'
         }
     });
     annonces = annonces.json();
     console.log(annonces);
     return annonces
 }


function Profil() {

    getUserAds();

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
                        {annonces.map(({ titre, description, prix, img_annonce }, index) => (
                            <AnnonceProfil titre={titre}
                                description={description}
                                prix={prix}
                                img_annonce={img_annonce}
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