import './infoAnnonce.css'

function InfoAnnonce() {
    return (
        <div className='InfoAnnonce'>
            <div className='InfoAnnonce-Haut'>
                <div className='InfoAnnonce-InfoEtPhotoVendeur'>
                    <div>
                        <img src={require('../../assets/DefaultPP.jpeg')} className='InfoAnnonce-PhotoVendeur' alt=""/>
                    </div>
                    <div className='InfoAnnonce-InfoVendeur'>
                        <div className='InfoAnnonce-NomVendeur'>
                            <p>Thomas Pasquet</p>
                        </div>
                        <div className='InfoAnnonce-NoteVendeur'>
                            <p>Note : 4.4/5</p>
                        </div>
                        <div className='InfoAnnonce-DescriptionVendeur'>
                            <p>Description du vendeur</p>
                        </div>
                        <div className='InfoAnnonce-LocalisationVendeur'>
                            <p>Ville du vendeur</p>
                        </div>
                    </div>
                </div>
                <div className='InfoAnnonce-PrixAnnonce'>
                    <p>Prix Annonce €</p>
                </div>
                <div className='InfoAnnonce-Boutons'>
                    <div className='InfoAnnonce-BoutonAchat'>
                        <input type="buy" name="buy" value="S'INSCRIRE"/>
                    </div>
                    <div className='InfoAnnonce-BoutonMessage'>
                        <p>Ou Contacter</p>
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
                <p>Ajout au favoris</p>
            </div>
        </div>
    )
}

export default InfoAnnonce;