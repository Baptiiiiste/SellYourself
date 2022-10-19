import './UneAnnonce.css'
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHeart, faChevronLeft, faChevronRight } from '@fortawesome/free-solid-svg-icons'

let index = 1;
document.onload = showDivs(1);

function plusDivs(n) {
    showDivs(index += n);
}

function showDivs(n) {
    // console.log("oui");
    // let i;
    // let x = document.getElementsByClassName("UneAnnonce-img-annonce");
    // let l = x.length;

    // for (i = 0; i < l; i++) {
    //     x[i].style.display = 'none';  
    // }

    // if (n > l) {
    //     index = 1;
    // }
    // if (n < 1) {
    //     index = l;
    // }

    // x[index-1].style.display = 'block';
}

function Vendeur({nom, prenom, photo, note}){
    return(
        <div className='Vendeur-all'>
            <img className='Vendeur-img' src={require('../../assets/DefaultPP.jpeg')} alt=""/>
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
                <p className='Contenu-titre'>{titre} :</p>
                <p className='Contenu-description'>{description}</p>
            </div>
            <div className='Contenu-other'>
                <button className='Contenu-bouton'>
                    <FontAwesomeIcon icon={faHeart} />
                </button>
                <p className='Contenu-prix'>{prix} €</p>
            </div>
        </div>
    )
}

function UneAnnonce({titre, description, prix, img_annonce, nom, prenom, img_profil, note}) {
    return (
        <div className='UneAnnonce-all'>
            <div className='UneAnnonce-image'>
                <Link to="/annonce">
                    <img className='UneAnnonce-img-annonce' src={require('../../assets/annonce1.jpg')} alt=""/>
                {/* <img className='UneAnnonce-img-annonce' src={require('../../assets/annonce2.jpg')} alt="" style={{display: "none"}}/>
                <img className='UneAnnonce-img-annonce' src={require('../../assets/annonce3.jpg')} alt="" style={{display: "none"}}/> */}
                </Link>
            </div>
            <div className='UneAnnonce-button'>
                <button className='UneAnnonce-button-left' onClick={() => plusDivs(-1)}><FontAwesomeIcon icon={faChevronLeft} /></button>
                <button className='UneAnnonce-button-right' onClick={() => plusDivs(1)}><FontAwesomeIcon icon={faChevronRight} /></button>
            </div>
            <div className='UneAnnonce-description'>
                <Vendeur nom={nom} prenom={prenom} photo={img_profil} note={note}/>
                <Contenu titre={titre} description={description} prix={prix}/>
            </div>
        </div>
    )
}

export default UneAnnonce;