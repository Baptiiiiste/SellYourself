import './PageValider.css'

function ValidationAchat({annonce}) { 
    return (
        <div className="PageValider">
            <p className='PageValider-Titre'>ACHAT</p>
            <div className="PageValider-Annonce">
            <img src={require('../../assets/DefaultPP.jpeg')} alt="" className='PageValider-Image'/>
                <div className="PageValider-InfoAchat">
                    <p className='PageValider-NomAnnonce'>{annonce.titre}</p>
                    <p className='PageValider-PrixAnnonce'>{annonce.prix}€</p>
                </div>
            </div>
            <div className='PageValider-DivBouton'>
                <button className='PageValider-Bouton'>CONFIRMER L'ACHAT</button>
            </div>
        </div>
    );
}

export default ValidationAchat;