import "./Vendeur.css";
import React from 'react';
import { Link } from 'react-router-dom';
import UneAnnonceDetaillee from '../../components/UneAnnonceDetaillee';
import HeaderCustom from "../../components/HeaderCustom";
import LeftBar from "../../components/LeftBar";
import InfoVendeur from "../../components/InfoVendeur";

const annonces = [
    {titre: "titre de l'annonce", description: "", prix: 27, img_annonce: "annonce1.jpg"},
    {titre: "titre de l'annonce", description: "", prix: 27, img_annonce: "annonce1.jpg"},
    {titre: "titre de l'annonce", description: "", prix: 27, img_annonce: "annonce1.jpg"},
    {titre: "titre de l'annonce", description: "", prix: 27, img_annonce: "annonce1.jpg"},
    {titre: "titre de l'annonce", description: "", prix: 27, img_annonce: "annonce1.jpg"},
    {titre: "titre de l'annonce", description: "", prix: 27, img_annonce: "annonce1.jpg"},
    {titre: "titre de l'annonce", description: "", prix: 27, img_annonce: "annonce1.jpg"},
    {titre: "titre de l'annonce", description: "", prix: 27, img_annonce: "annonce1.jpg"},
    {titre: "titre de l'annonce", description: "", prix: 27, img_annonce: "annonce1.jpg"},
    {titre: "titre de l'annonce", description: "", prix: 27, img_annonce: "annonce1.jpg"},
    {titre: "titre de l'annonce", description: "", prix: 27, img_annonce: "annonce1.jpg"},
    {titre: "titre de l'annonce", description: "", prix: 27, img_annonce: "annonce1.jpg"},
    {titre: "titre de l'annonce", description: "", prix: 27, img_annonce: "annonce1.jpg"},
    {titre: "titre de l'annonce", description: "", prix: 27, img_annonce: "annonce1.jpg"},
]

function Vendeur() {
    return (
        <div className='UnVendeur'>
            <LeftBar/>
            <div className='UnVendeur-center'>
                <div className="UnVendeur-header">
                    <HeaderCustom title="Vendeur"/>
                </div>
                <div className="UnVendeur-info">
                    <InfoVendeur description="OOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOO"/>
                    <div className="UnVendeur-annonces">
                        {annonces.map(({ titre, description, prix, img_annonce }, index) => (
                                    <Link to="/annonce" className="Favoris-annonce">
                                        <UneAnnonceDetaillee titre={titre}
                                        description={description}
                                        prix={prix}
                                        img_annonce={img_annonce}
                                        key={index}/>
                                    </Link>
                                ))}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Vendeur;