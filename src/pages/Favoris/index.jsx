import "./Favoris.css";
import React from 'react';
import { Link } from "react-router-dom";
import HeaderCustom from "../../components/HeaderCustom";
import UneAnnonceDetaillee from "../../components/UneAnnonceDetaillee";
import LeftBar from "../../components/LeftBar";
import { useState, useEffect } from "react";

const favs = [
    {titre: "titre de l'annonce", description: "bla bla bla", prix: 27, img_annonce: "annonce1.jpg"},
    {titre: "titre de l'annonce", description: "bla bla bla", prix: 27, img_annonce: "annonce1.jpg"},
    {titre: "titre de l'annonce", description: "bla bla bla", prix: 27, img_annonce: "annonce1.jpg"},
    {titre: "titre de l'annonce", description: "bla bla bla", prix: 27, img_annonce: "annonce1.jpg"},
    {titre: "titre de l'annonce", description: "bla bla bla", prix: 27, img_annonce: "annonce1.jpg"},
    {titre: "titre de l'annonce", description: "bla bla bla", prix: 27, img_annonce: "annonce1.jpg"},
    {titre: "titre de l'annonce", description: "bla bla bla", prix: 27, img_annonce: "annonce1.jpg"},
    {titre: "titre de l'annonce", description: "bla bla bla", prix: 27, img_annonce: "annonce1.jpg"},
    {titre: "titre de l'annonce", description: "bla bla bla", prix: 27, img_annonce: "annonce1.jpg"},
    {titre: "titre de l'annonce", description: "bla bla bla", prix: 27, img_annonce: "annonce1.jpg"},
    {titre: "titre de l'annonce", description: "bla bla bla", prix: 27, img_annonce: "annonce1.jpg"},
    {titre: "titre de l'annonce", description: "bla bla bla", prix: 27, img_annonce: "annonce1.jpg"},
    {titre: "titre de l'annonce", description: "bla bla bla", prix: 27, img_annonce: "annonce1.jpg"},
    {titre: "titre de l'annonce", description: "bla bla bla", prix: 27, img_annonce: "annonce1.jpg"},
]

const connectedUser = sessionStorage.getItem("user");

const getUserFavs = async () => {
    let favoris = await fetch(`http://localhost:5000/api/favoris/${JSON.parse(connectedUser).pseudo}`, {
        method: "Get",
        headers: {
            'Content-Type': 'Application/json'
        }
    });
    favoris = favoris.json();
    console.log(favoris);
    return favoris
}

function Favoris() {

    getUserFavs();

    return (
        <div className='Favoris'>
            <LeftBar/>
            <div className='Favoris-center'>
                <div className="Favoris-header">
                    <HeaderCustom title="Favoris"/>
                </div>
                <div className="Favoris-info">
                    {favs.map(({ titre, description, prix, img_annonce }, index) => (
                        <Link to="/annonce" className="Favoris-annonce">
                            <UneAnnonceDetaillee titre={titre}
                                                 description={description}
                                                 prix={prix}
                                                 img_annonce={img_annonce}
                                                 key={index}
                            />
                        </Link>
                    ))}
                </div>
            </div>
        </div>
    )
}

export default Favoris;