import './UneAnnonce.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHeart, faChevronLeft, faChevronRight } from '@fortawesome/free-solid-svg-icons'
import { Link } from 'react-router-dom'

let index = 1;
document.onload = showDivs(1);

function plusDivs(n) {
    showDivs(index += n);
}

function showDivs(n) {
    console.log("oui");
    let i;
    let x = document.getElementsByClassName("UneAnnonce-img-annonce");
    let l = x.length;

    for (i = 0; i < l; i++) {
        x[i].style.display = 'none';  
    }

    if (n > l) {
        index = 1;
    }
    if (n < 1) {
        index = l;
    }

    // x[index-1].style.display = 'block';
}

function Vendeur({nom, prenom, photo, note}){
    return(
        <div className='Vendeur-all'>
            <div className='Vendeur-info-all'>
                <img className='Vendeur-img' src={require('../../assets/DefaultPP.jpeg')} alt=""/>
                <div className='Vendeur-info'>
                    <p className='Vendeur-nom'>{prenom} {nom}</p>
                    <p className='Vendeur-note'>Note: {note}/5</p>
                </div>
            </div>
            <div className="Vendeur-annonce-all">
                <Link to="/annonce"><input type="submit" name="submit" value="VOIR L'ANNONCE"/></Link>
            </div>
        </div>
    )
}

function Contenu({titre, description, prix}){
    return(
        <div className='Contenu-all'>
            <div className='Contenu-text'>
                <p className='Contenu-titre'>{titre} :</p>
                <p className='Contenu-description'>{description}</p>
            </div>
            <div className='Contenu-other'>
                <FontAwesomeIcon icon={faHeart} />
                <p className='Contenu-prix'>{prix} €</p>
            </div>
        </div>
    )
}

function UneAnnonce({titre, description, prix, img_annonce, nom, prenom, img_profil, note}) {
    return (
        <div className='UneAnnonce-all'>
            <div className='UneAnnonce-image'>
                <img className='UneAnnonce-img-annonce' src={require('../../assets/annonce1.jpg')} alt=""/>
                <img className='UneAnnonce-img-annonce' src={require('../../assets/annonce2.jpg')} alt=""/>
                <img className='UneAnnonce-img-annonce' src={require('../../assets/annonce3.jpg')} alt=""/>
            </div>
            <div className='UneAnnonce-button'>
                <button className='UneAnnonce-button-left' onClick={() => plusDivs(-1)}><FontAwesomeIcon icon={faChevronLeft} /></button>
                <button className='UneAnnonce-button-right' onClick={() => plusDivs(1)}><FontAwesomeIcon icon={faChevronRight} /></button>
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