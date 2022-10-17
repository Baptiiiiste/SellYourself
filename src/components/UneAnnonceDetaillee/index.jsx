import './UneAnnonceDetaillee.css';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrashCan } from'@fortawesome/free-solid-svg-icons';

function UneAnnonceDetaillee({titre, description, prix, img_annonce}){
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
                <button className="UneAnnonceDetaillee-delete">
                    <FontAwesomeIcon className="UneAnnonceDetaillee-icon" icon={faTrashCan}/>
                </button>
                <p className="UneAnnonceDetaillee-prix">{prix} €</p>
            </div>
        </div>
    )
}

export default UneAnnonceDetaillee;