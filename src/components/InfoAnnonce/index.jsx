import { Link, link } from 'react-router-dom';
import './infoAnnonce.css'

function InfoAnnonce() {
    return (
        <div className='InfoAnnonce'>
            <div className='InfoAnnonceHaut'>
                <div className='InfoAnnonceInfoEtPhotoVendeur'>
                    <div>
                        <img src={require('../../assets/DefaultPP.jpeg')} className='InfoAnnoncePhotoVendeur'/>
                    </div>
                    <div className='InfoAnnonceInfoVendeur'>
                        <div className='InfoAnnonceNomVendeur'>
                            <p>Thomas Pasquet</p>
                        </div>
                        <div className='InfoAnnonceNoteVendeur'>
                            <p>Note : 4.4/5</p>
                        </div>
                        <div className='InfoAnnonceDescriptionVendeur'>
                            <p>Description du vendeur</p>
                        </div>
                        <div className='InfoAnnonceLocalisationVendeur'>
                            <p>Ville du vendeur</p>
                        </div>
                    </div>
                </div>
                <div className='InfoAnnoncePrixAnnonce'>
                    <p>Prix Annonce €</p>
                </div>
                <div className='InfoAnnonceBoutons'>
                    <div className='InfoAnnonceBoutonAchat'>
                        <input type="buy" name="buy" value="S'INSCRIRE"/>
                    </div>
                    <div className='InfoAnnonceBoutonMessage'>
                        <p>Ou Contacter</p>
                    </div>
                </div>
            </div>
            <div className='InfoAnnonceNomAnnonce'>
                <p>Titre de l'annonce</p>
            </div>
            <div className='InfoAnnonceDescriptionAnnonce'>
                <p>Description de l'annonce</p>
            </div>
            <div className='InfoAnnoncePhotosAnnonce'>
                <p>photo 1</p>
                <p>photo 2</p>
            </div>
            <div className='InfoAnnonceAjoutFav'>
                <p>Ajout au favoris</p>
            </div>
        </div>
    )
}

export default InfoAnnonce;