import './UneAnnonceDetaillee.css';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrashCan } from'@fortawesome/free-solid-svg-icons';

function UneAnnonceDetaillee({id, titre, description, prix, img_annonce}){

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

    return(
        <div className="UneAnnonceDetaillee-all">
            <div className='UneAnnonceDetaillee-info'>
                <p className="UneAnnonceDetaillee-titre">{titre}</p>
                <div className='UneAnnonce-descriptionImage'>
                    <img className="UneAnnonceDetaillee-image" src={require("../../assets/annonce1.jpg")} alt=""/>
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