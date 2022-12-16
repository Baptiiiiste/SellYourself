import "./Favoris.css";
import React from 'react';
import HeaderCustom from "../../components/HeaderCustom";
import UneAnnonceDetaillee from "../../components/UneAnnonceDetaillee";
import LeftBar from "../../components/LeftBar";
import { useState, useEffect } from "react";

/*const connectedUser = sessionStorage.getItem("user");

const getUserFavs = async () => {
    let favoris = await fetch(`http://localhost:5000/api/favoris/${JSON.parse(connectedUser).pseudo}`, {
        method: "Get",
        headers: {
            'Content-Type': 'Application/json'
        }
    });
    favoris = favoris.json();
    return favoris
}*/

// Fonction de la page Favoris
function Favoris() {

    // On récupère l'utilisateur connecté
    let connectedUser = sessionStorage.getItem("user");

    // On appel la fonction pour récupérer les favoris de l'utilisateur connecté
	useEffect(() => {
		getUserFavs();
	}, [])

    // Déclarations de la variable qui contiendra les annonces favorites de l'utilisateur
    const [favoris, setAnnonces] = useState([]);

    // On récupère la liste des annonces favorites dans la variables précédemment déclarée
    const getUserFavs = async () => {
		let listFavs = [];
        // On récupère une liste d'id des annonces favorites stockées dans le navigateur (session storage)
        // et pour chaque id, on ajoute les informations de l'annonce à listFavs à l'aide de l'API
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
        // On met les informations stockés dans listFavs dans favoris
		setAnnonces(listFavs)
	}
	
    // Fonction utilisée pour afficher une seule annonce
	const displayFavoris = (item, index) => {
		const favoris = item;
	
		return (<UneAnnonceDetaillee 
            id={favoris._id}
            titre={favoris.titre}
            description={favoris.description}
            prix={favoris.prix}
            img_annonce={favoris.image}
            owner={favoris.utilisateur}
            vendu={favoris.vendu}
            key={favoris.index}
            />)
    }

    // retourne l'HTML de la page
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