import './ProfilUtilisateur.css';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from'@fortawesome/free-solid-svg-icons';

function InfoUtilisateur(){
    return(
        <div>

        </div>
    )
}

function UneAnnonceProfil({titre, description, prix, img_annonce}){
    return(
        <div className="UneAnnonceProfil-all">
            <div className='UneAnnonceProfil-info'>
                <p className="UneAnnonceProfil-titre">{titre}</p>
                <img className="UneAnnonceProfil-image" src={require("../../assets/annonce1.jpg")} alt=""/>
                <p className="UneAnnonceProfil-description">{description}</p>
            </div>
            <div className='UneAnnonceProfil-other'>
                <button className="UneAnnonceProfil-delete">
                    <FontAwesomeIcon icon={faTrash}/>
                </button>
                <p className="UneAnnonceProfil-prix">{prix} €</p>
            </div>
        </div>
    )
}

function ProfilUtilisateur(){
    return(
        <div className='ProfilUtilisateur'>
            {/* <InfoUtilisateur className='InfoUtilisateur' nom='test nom' 
                            prenom='test prenom' 
                            img_profil='DefaultPP.jpeg' 
                            note={4.5}/> */}
            <UneAnnonceProfil className='UneAnnonceProfil' titre='test annonce titre' 
                            description='OOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOO' 
                            prix={27} 
                            img_annonce='DefaultPP.jpeg'/>
        </div>
    )
}

export default ProfilUtilisateur;