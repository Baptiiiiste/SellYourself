import './UneAnnonce.css'

function Vendeur({nom, prenom, photo, note}){
    const img = '../../assets/' + photo;
    console.log(img)
    let image = require('../../assets/' + photo);

    return(
        <div className='Vendeur-all'>
            <img className='Vendeur-img' src={image.default} alt=""/>
            <div className='Vendeur-info'>
                <p className='Vendeur-nom'>{prenom} {nom}</p>
                <p className='Vendeur-note'>Note: {note}/5</p>
            </div>
        </div>
    )
}

function Contenu({titre, description, prix}){
    return(
        <div className='Contenu-all'>
            <div className='Contenu-text'>
                <p className='Contenu-titre'>{titre}</p>
                <p className='Contenu-description'>{description}</p>
            </div>
            <div>
                {/* <img className='Contenu-logo' src={require('../../assets/addLogo.png')} alt=""/> */}
                <p className='Contenu-prix'>{prix} €</p>
            </div>
        </div>
    )
}

function UneAnnonce({titre, description, prix, img_annonce, nom, prenom, img_profil, note}) {
    return (
        <div className='UneAnnonce-all'>
            <div className='UneAnnonce-image'>
                <img className='UneAnnonce-img-annonce' src={'../../assets/DefaultPP.jpeg'} alt=""/>
            </div>
            <div className='UneAnnonce-description'>
                <div className='UneAnnoce-vendeur'>
                    <Vendeur nom={nom} prenom={prenom} photo={img_profil} note={note}/>
                </div>
                <div className='UneAnnoce-content'>
                    <Contenu titre={titre} description={description} prix={prix}/>
                </div>
            </div>
        </div>
    )
}

export default UneAnnonce;