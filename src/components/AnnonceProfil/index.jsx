// Import 
import './AnnonceProfil.css';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrashCan, faPen } from'@fortawesome/free-solid-svg-icons';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';

// Composant qui représente une annonce de la page profil
function AnnonceProfil({titre, description, prix, img_annonce, id, owner, vendu}){
    // Variable
    const navigate = useNavigate();

    useEffect(() => {
        isVendu(id);
    }, [])

    // Fonction pour être redirigé vers l'annonce choisis
    const redirectToAd = () => {
        navigate(`/annonce/${owner[0]}/${id}`);
    }

    // Fonction pour supprimer une annonce
    const deleteAd = async () => {

        const valid = await window.confirm(`Vous etes sur le point de supprimer l'annonce:\n ${titre}\n Valider ?`);
        if(!valid) return;

        let result = await fetch(`http://localhost:5000/api/annonce/delete/${owner[0]}/${id}`, {
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
    
    const redirectToModifAd = () => {
        navigate(`/modifier/${id}`);
    }

    const isVendu = (id) => {
        const div = document.getElementById("all" + id);
        const edit = document.getElementById("edit" + id);
        if(div !== undefined){
            if(vendu){
                div.style.border = 'solid 4px green';
                edit.style.display = 'none';
            }
        }
    }

    // Affichage HTML
    return(
        <div className="UneAnnonceDetaillee-all" id={"all" + id}>
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
                <button className="UneAnnonceDetaillee-edit" id={"edit" + id} onClick={redirectToModifAd}>
                    <FontAwesomeIcon className="UneAnnonceDetaillee-icon" icon={faPen}/>
                </button>
                <p className="UneAnnonceDetaillee-prix">{prix} €</p>
            </div>
        </div>
    )
}

export default AnnonceProfil;