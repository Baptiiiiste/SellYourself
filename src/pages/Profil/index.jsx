// Import
import "./Profil.css";
import { useState, useEffect} from 'react';
import HeaderCustom from "../../components/HeaderCustom";
import InfoUtilisateur from "../../components/InfoUtilisateur";
import LeftBar from "../../components/LeftBar";
import AnnonceProfil from "../../components/AnnonceProfil";

// Page de profil utilisateur
function Profil() {
	// Variables
    let connectedUser = sessionStorage.getItem("user");
	const [annonces, setAnnonces] = useState([]);

	useEffect(() => {
		getUserAds();
	}, [])

	// Fonction pour récupérer les annonces de l'utilisateur
    const getUserAds = async () => {
		let listAds = [];
		for(let annonce of JSON.parse(connectedUser).annonces){
			let a = await fetch(`https://api.sellyourself.fr/api/annonce/${annonce}`, {
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
	
	// fonction pour afficher une annonce
	const displayAnnonce = (item, index) => {
		const annonce = item;
	
		return (<AnnonceProfil titre={annonce.titre}
			description={annonce.description}
			prix={annonce.prix}
			img_annonce={annonce.image}
			id = {annonce._id}
			owner = {[(JSON.parse(connectedUser).pseudo), (JSON.parse(connectedUser)._id)]}
			vendu = {annonce.vendu}
			key={index}
		/>)
	}

    
	// Affichage HTML
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