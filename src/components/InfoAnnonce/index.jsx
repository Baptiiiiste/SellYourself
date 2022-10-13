import './infoAnnonce.css'
import { Link } from 'react-router-dom';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faBookmark} from '@fortawesome/free-solid-svg-icons';

function InfoAnnonce() {
    return (
        <div className='InfoAnnonce'>
            <div className='InfoAnnonce-Haut'>
                <div className='InfoAnnonce-InfoEtPhotoVendeur'>
                    <div>
                        <img src={require('../../assets/DefaultPP.jpeg')} className='InfoAnnonce-PhotoVendeur' />
                    </div>
                    <div className='InfoAnnonce-InfosVendeur'>
                            <p className='InfoAnnonce-NomVendeur'>Thomas Pasquet</p>
                            <p className='InfoAnnonce-NoteVendeur'>Note : 4.4/5</p>
                            <p className='InfoAnnonce-DescriptionVendeur'>Description du vendeur</p>
                            <p className='InfoAnnonce-LocalisationVendeur'>Ville du vendeur</p>
                    </div>
                </div>
                <div className='InfoAnnonce-PrixAnnonce'>
                    <p>XX.XX €</p>
                </div>
                <div className='InfoAnnonce-Boutons'>
                    <div className='InfoAnnonce-DivBoutonAchat'>
                        <input type='submit' value="Acheter" id="InfoAnnonce-Achat"/>
                    </div>
                    <div className='InfoAnnonce-BoutonMessage'>
                        <Link to={'/message'}>
                            <p>Contacter</p>
                        </Link>
                    </div>
                </div>
            </div>
            <div className='InfoAnnonce-NomAnnonce'>
                <p>Titre de l'annonce</p>
            </div>
            <div className='InfoAnnonce-DescriptionAnnonce'>
                <p>Description de l'annonce</p>
            </div>
            <div className='InfoAnnonce-PhotosAnnonce'>
                <p>photo 1</p>
                <p>photo 2</p>
            </div>
            <div className='InfoAnnonce-AjoutFav'>
                <FontAwesomeIcon icon={faBookmark} />
                <p>Ajout au favoris</p>
            </div>
        </div>
    )
}

export default InfoAnnonce;