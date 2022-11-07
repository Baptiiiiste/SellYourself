import './UneAnnonce.css'
import React from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHeart } from '@fortawesome/free-solid-svg-icons'

function Contenu({titre, description, prix}){
    return(
        <div className='Contenu-all'>
            <div>
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

function UneAnnonce({id, titre, description, prix, img_annonce, pseudoVendeur}) {

    return (
        <div className='UneAnnonce-all'>
            <Link to={"/annonce/" + id} params={{titre: titre}} className='UneAnnonce-div-Image'>
                <img className='UneAnnonce-img-annonce' src={require('../../assets/annonce1.jpg')} alt=""/>
                <img className='UneAnnonce-img-annonce' src={require('../../assets/annonce2.jpg')} alt=""/>
                <img className='UneAnnonce-img-annonce' src={require('../../assets/annonce3.jpg')} alt=""/>
            </Link>
            <div className='UneAnnonce-description'>
                <Contenu titre={titre} description={description} prix={prix}/>
                <div className='UneAnnonce-Vendeur'>
                    <p>Proposée par : </p>
                    <p className='UneAnnonce-Vendeur-nom'>{pseudoVendeur}</p>
                </div>
            </div>
        </div>
    )
}

export default UneAnnonce;