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

    let connectedUser = sessionStorage.getItem("user");

	useEffect(() => {
		getUserFavs();
	}, [])

    const [favoris, setAnnonces] = useState([]);

    const getUserFavs = async () => {
		let listFavs = [];
		for(let i = 0; i < (JSON.parse(connectedUser).favoris).length; i++){
			let a = await fetch(`http://localhost:5000/api/annonce/${JSON.parse(connectedUser).favoris[i]}`, {
				method: "Get",
				headers: {
					'Content-Type': 'Application/json',
					authorization: `bearer ${JSON.parse(sessionStorage.getItem('token'))}`
				}
			});
			a = await a.json().then(a => listFavs.push(a));
		}
		setAnnonces(listFavs)
        console.log(listFavs)
	}
	
	const displayFavoris = (item, index) => {
		const favoris = item;
		console.log(favoris);
	
		return (<UneAnnonceDetaillee 
            id={favoris._id}
            titre={favoris.titre}
            description={favoris.description}
            prix={favoris.prix}
            img_annonce={favoris.img_annonce}
            key={favoris.index}
            />)
    }

    return (
        <div className='Favoris'>
            <LeftBar/>
            <div className='Favoris-center'>
                <div className="Favoris-header">
                    <HeaderCustom title="Favoris"/>
                </div>
                <div className="Favoris-info">
                    {favoris.map((item, index) => (
						displayFavoris(item, index)
					))}
                </div>
            </div>
        </div>
    )
}

export default Favoris;