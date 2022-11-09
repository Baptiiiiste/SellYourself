import './UneAnnonce.css'
import React from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHeart, faStar } from '@fortawesome/free-solid-svg-icons'

function Vendeur({pseudo, photo, note}){
    let nbNote = note.length;
    if(nbNote === 0){
        note = "Aucune note"
    }
    else{
        let moy = 0;
        for( const n of note){
            moy += parseInt(n.note);
        }
        moy = moy/nbNote
        note = moy + "/5";
    }

    return(
        <div className='Vendeur-all'>
            <img className='Vendeur-img' src={require('../../assets/DefaultPP.jpeg')} alt=""/>
            <div className='Vendeur-info'>
                <p className='Vendeur-nom'>{pseudo}</p>
                <p className='Vendeur-note'>Note: {note}{ note !== "Aucune note" && <FontAwesomeIcon icon={faStar} />} ( {nbNote} avis )</p>
            </div>
        </div>
    )
}

// Pour ajouter une annonce aux favoris
function addFavoris() {

}

function Contenu({titre, description, prix}){
    return(
        <div className='Contenu-all'>
            <div className='Contenu-text'>
                <p className='Contenu-titre'>{titre} :</p>
                <p className='Contenu-description'>{description}</p>
            </div>
            <div className='Contenu-other'>
                <button className='Contenu-bouton' onClick="addFavoris();">
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