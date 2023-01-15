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

        let result = await fetch(`https://api.sellyourself.fr/api/annonce/delete/${owner[1]}/${id}`, {
            method: "Delete",
            headers: {
                'Content-Type': 'Application/json',
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Credentials':true,
                'Access-Control-Allow-Methods':'POST, GET, DELETE, PUT',
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
            if(img_annonce.length === 0) return <img className="AnnonceProfil-image" src={require('../../assets/default.png')} alt=""/>
            else return <img className="AnnonceProfil-image" src={img_annonce[0]}  alt=""/>
        }
    }
    
    // Fonction pour aller à la page de modification de l'annonce
    const redirectToModifAd = () => {
        navigate(`/modifier/${id}`);
    }

    // Fonction pour changer l'affichage si l'annonce est vendu
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
        <div className="AnnonceProfil-all" id={"all" + id}>
            <div className='AnnonceProfil-info' onClick={redirectToAd}>
                <p className="AnnonceProfil-titre">{titre}</p>
                <div className='UneAnnonce-descriptionImage'>
                    {displayImage()}
                    <p className="AnnonceProfil-description">{description}</p>
                </div>
                
            </div>
            <div className='AnnonceProfil-other'>
                <button className="AnnonceProfil-delete" onClick={deleteAd}>
                    <FontAwesomeIcon className="AnnonceProfil-icon" icon={faTrashCan} />
                </button>
                <button className="AnnonceProfil-edit" id={"edit" + id} onClick={redirectToModifAd}>
                    <FontAwesomeIcon className="AnnonceProfil-icon" icon={faPen}/>
                </button>
                <p className="AnnonceProfil-prix">{prix} €</p>
            </div>
        </div>
    )
}

export default AnnonceProfil;