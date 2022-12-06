import './AnnonceProfil.css';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrashCan, faPen } from'@fortawesome/free-solid-svg-icons';
import { useNavigate } from 'react-router-dom';


function AnnonceProfil({titre, description, prix, img_annonce, id, owner}){

    const navigate = useNavigate();

    const redirectToAd = () => {
        navigate(`/annonce/${owner[0]}/${id}`);
    }

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

    const redirectToModifAd = () => {
        navigate(`/modifier/${id}`);
    }



    return(
        <div className="UneAnnonceDetaillee-all">
            <div className='UneAnnonceDetaillee-info' onClick={redirectToAd}>
                <p className="UneAnnonceDetaillee-titre">{titre}</p>
                <div className='UneAnnonce-descriptionImage'>
                    <img className="UneAnnonceDetaillee-image" src={require("../../assets/annonce1.jpg")} alt=""/>
                    <p className="UneAnnonceDetaillee-description">{description}</p>
                </div>
                
            </div>
            <div className='UneAnnonceDetaillee-other'>
                <button className="UneAnnonceDetaillee-delete" onClick={deleteAd}>
                    <FontAwesomeIcon className="UneAnnonceDetaillee-icon" icon={faTrashCan} />
                </button>
                <button className="UneAnnonceDetaillee-edit" onClick={redirectToModifAd}>
                    <FontAwesomeIcon className="UneAnnonceDetaillee-icon" icon={faPen}/>
                </button>
                <p className="UneAnnonceDetaillee-prix">{prix} €</p>
            </div>
        </div>
    )
}

export default AnnonceProfil;