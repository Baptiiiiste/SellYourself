import './UneAnnonce.css'
import React from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHeart } from '@fortawesome/free-solid-svg-icons'

function Vendeur({pseudo, photo, note}){
    return(
        <div className='Vendeur-all'>
            <img className='Vendeur-img' src={require('../../assets/DefaultPP.jpeg')} alt=""/>
            <div className='Vendeur-info'>
                <p className='Vendeur-nom'>{pseudo}</p>
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

function UneAnnonce({id, titre, description, prix, img_annonce, pseudoVendeur, note, img_profil}) {

    return (
        <div className='UneAnnonce-all'>
            <Link to={"/annonce/" + id + "/" + pseudoVendeur} params={{titre: titre}} className='UneAnnonce-div-Image'>
                <img className='UneAnnonce-img-annonce' src={require('../../assets/annonce1.jpg')} alt=""/>
                <img className='UneAnnonce-img-annonce' src={require('../../assets/annonce2.jpg')} alt=""/>
                <img className='UneAnnonce-img-annonce' src={require('../../assets/annonce3.jpg')} alt=""/>
            </Link>
            <div className='UneAnnonce-description'>
                <Vendeur pseudo={pseudoVendeur} photo={img_profil} note={note}/>
                <Contenu titre={titre} description={description} prix={prix}/>
            </div>
        </div>
    )
}

export default UneAnnonce;