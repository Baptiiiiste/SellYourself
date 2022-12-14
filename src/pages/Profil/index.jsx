import "./Profil.css";
import {useState} from 'react';

import HeaderCustom from "../../components/HeaderCustom";
import InfoUtilisateur from "../../components/InfoUtilisateur";
import LeftBar from "../../components/LeftBar";
import { useEffect } from "react";
import AnnonceProfil from "../../components/AnnonceProfil";

// Page de profil utilisateur
function Profil() {
	// Utilisateur connecté
    let connectedUser = sessionStorage.getItem("user");

	// Appel de fonction pour récupérer les annonces de l'utilisateur
	useEffect(() => {
		getUserAds();
	}, [])

    const [annonces, setAnnonces] = useState([]);

	// Fonction pour récupérer les annonces de l'utilisateur à l'aide d'une requête vers l'api
    const getUserAds = async () => {
		let listAds = [];
		for(let i = 0; i < (JSON.parse(connectedUser).annonces).length; i++){
			let a = await fetch(`http://localhost:5000/api/annonce/${JSON.parse(connectedUser).annonces[i]}`, {
				method: "Get",
				headers: {
					'Content-Type': 'Application/json',
					authorization: `bearer ${JSON.parse(sessionStorage.getItem('token'))}`
				}
			});
			a = await a.json().then(a => listAds.push(a));
		}
		setAnnonces(listAds)
	}
	
	// fonction pour afficher 1 annonce de l'utilisateur
	const displayAnnonce = (item, index) => {
		const annonce = item;
	
		return (<AnnonceProfil titre={annonce.titre}
			description={annonce.description}
			prix={annonce.prix}
			img_annonce={annonce.image}
			id = {annonce._id}
			owner = {[(JSON.parse(connectedUser).pseudo), (JSON.parse(connectedUser)._id)]}
			key={index}
		/>)
	}

    
	// Affichage de la page avec un appel aux composants nécessaire
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
						{annonces.map((item, index) => (
							displayAnnonce(item, index)
						))}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Profil;