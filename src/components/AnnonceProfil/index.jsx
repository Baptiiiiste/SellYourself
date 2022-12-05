// Import 
import './AnnonceProfil.css';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrashCan, faPen } from'@fortawesome/free-solid-svg-icons';
import { useNavigate } from 'react-router-dom';

// Composant qui représente une annonce de la page profil
function AnnonceProfil({titre, description, prix, img_annonce, id, owner}){
    // Variable
    const navigate = useNavigate();

    // Fonction pour être redirigé vers l'annonce choisis
    const redirectToAd = () => {
        navigate(`/annonce/${owner[0]}/${id}`);
    }

    // Fonction pour supprimer une annonce
    const deleteAd = async () => {
        let result = await fetch(`http://localhost:5000/api/annonce/delete/${owner[1]}/${id}`, {
            method: "Delete",
            headers: {
                'Content-Type': 'Application/json',
                authorization: `bearer ${JSON.parse(sessionStorage.getItem('token'))} `
            }
        });
        result = await result.json();
        if(result.erreur) return alert(result.erreur);
        else{
            sessionStorage.removeItem("user");
            sessionStorage.setItem("user", JSON.stringify(result.user));
            window.location.reload(false);
        }
    }

    // Fonction pour afficher les images
    const displayImage = () => {
        if(img_annonce !== undefined){
            if(img_annonce.length === 0) return <img className="UneAnnonceDetaillee-image" src={require('../../assets/default.png')} alt=""/>
            else return <img className="UneAnnonceDetaillee-image" src={img_annonce[0]}  alt=""/>
        }
    }

    // Affichage HTML
    return(
        <div className="UneAnnonceDetaillee-all">
            <div className='UneAnnonceDetaillee-info' onClick={redirectToAd}>
                <p className="UneAnnonceDetaillee-titre">{titre}</p>
                <div className='UneAnnonce-descriptionImage'>
                    {displayImage()}
                    <p className="UneAnnonceDetaillee-description">{description}</p>
                </div>
                
            </div>
            <div className='UneAnnonceDetaillee-other'>
                <button className="UneAnnonceDetaillee-delete" onClick={deleteAd}>
                    <FontAwesomeIcon className="UneAnnonceDetaillee-icon" icon={faTrashCan} />
                </button>
                <button className="UneAnnonceDetaillee-edit">
                    <FontAwesomeIcon className="UneAnnonceDetaillee-icon" icon={faPen}/>
                </button>
                <p className="UneAnnonceDetaillee-prix">{prix} €</p>
            </div>
        </div>
    )
}

export default AnnonceProfil;