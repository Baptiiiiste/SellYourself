// Import
import "./Favoris.css";
import { React, useState, useEffect } from "react";
import HeaderCustom from "../../components/HeaderCustom";
import UneAnnonceDetaillee from "../../components/UneAnnonceDetaillee";
import LeftBar from "../../components/LeftBar";

// Page Favoris
function Favoris() {
    // Variables
    let connectedUser = sessionStorage.getItem("user");
    const [favoris, setAnnonces] = useState([]);

	useEffect(() => {
		getUserFavs();
	}, [])

    // Fonction pour récupérer les favoris d'un utilisateur
    const getUserFavs = async () => {
		let listFavs = [];
		for(let fav of JSON.parse(connectedUser).favoris){
			let a = await fetch(`https://api.sellyourself.fr/api/annonce/${fav}`, {
				method: "Get",
				headers: {
					'Content-Type': 'Application/json',
					authorization: `bearer ${JSON.parse(sessionStorage.getItem('token'))}`
				}
			});
			a = await a.json().then(a => listFavs.push(a));
		}
		setAnnonces(listFavs)
	}
	
    // Fonction pour afficher un favoris
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

    // Affichage HTML
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