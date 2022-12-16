// Import 
import './UneAnnonceDetaillee.css';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrashCan } from'@fortawesome/free-solid-svg-icons';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';

function UneAnnonceDetaillee({id, titre, description, prix, img_annonce, owner, vendu}){
    const navigate = useNavigate();

    useEffect(() => {
        isVendu(id);
    })

    const deleteAdFromFavs = async () => {
        let connectedUser = sessionStorage.getItem("user");

        let result = await fetch(`http://localhost:5000/api/favoris/delete/${JSON.parse(connectedUser)._id}/${id}`, {
            method: "Delete",
            headers: {
                'Content-Type': 'Application/json',
                authorization: `bearer ${JSON.parse(sessionStorage.getItem('token'))} `
            }
        });
        result = await result.json();
        if(result.erreur) {
            return alert(result.erreur);
        } else {
            sessionStorage.removeItem("user");
            sessionStorage.setItem("user", JSON.stringify(result.user));
            window.location.reload(false);
        }
    }

    const displayImage = () => {
        if(img_annonce !== undefined){
            if(img_annonce.length === 0) return <img className="UneAnnonceDetaillee-image" src={require('../../assets/default.png')}/>
            else return <img className="UneAnnonceDetaillee-image" src={img_annonce[0]}/>
        }
    }

    const redirectToAd = () => {
        navigate(`/annonce/${owner}/${id}`);
    }

    const isVendu = (id) => {
        const div = document.getElementById(id);
        if(div !== undefined){
            if(vendu){
                div.style.border = 'solid 4px green';
            }
        }
    }

    return(
        <div className="UneAnnonceDetaillee-all" id={id}>
            <div className='UneAnnonceDetaillee-info' onClick={redirectToAd}>
                <p className="UneAnnonceDetaillee-titre">{titre}</p>
                <div className='UneAnnonce-descriptionImage'>
                    {displayImage()}
                    <p className="UneAnnonceDetaillee-description">{description}</p>
                </div>
                
            </div>
            <div className='UneAnnonceDetaillee-other'>
                <button className="UneAnnonceDetaillee-delete" onClick={deleteAdFromFavs}>
                    <FontAwesomeIcon className="UneAnnonceDetaillee-icon" icon={faTrashCan}/>
                </button>
                <p className="UneAnnonceDetaillee-prix">{prix} €</p>
            </div>
        </div>
    )
}

export default UneAnnonceDetaillee;