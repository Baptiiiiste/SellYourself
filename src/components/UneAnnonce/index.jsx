import './UneAnnonce.css'
import React, { useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHeart, faChevronLeft, faChevronRight } from '@fortawesome/free-solid-svg-icons'

let index = 1;

function plusDivs(n) {
    showDivs(index += n);
}

function showDivs(n) {
    let i;
    let x = document.querySelectorAll(".UneAnnonce-img-annonce");
    let l = x.length;

    if (n > l) {
        index = 1;
    }
    if (n < 1) {
        index = l;
    }
    for (i = 0; i < l; i++) {
        x[i].style.display = 'none';  
    }
    x[index-1].style.display = 'block';
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
    const refLeft = React.createRef();
    const refRight = React.createRef();
    const refDiv = React.createRef();

    useEffect(() => {
        showDivs(1);
        const buttonLeft = refLeft.current;
        const buttonRight = refRight.current;

        console.log(buttonLeft);

        buttonLeft.onclick = console.log("oui");
        // buttonRight.addEventListener('click', plusDivs(1));

        
    }, []);

    return (
        <div className='UneAnnonce-all'>
            <div className='UneAnnonce-image' ref={refDiv}>
                <Link to="/annonce">
                    <img className='UneAnnonce-img-annonce' src={require('../../assets/annonce1.jpg')} alt=""/>
                    <img className='UneAnnonce-img-annonce' src={require('../../assets/annonce2.jpg')} alt=""/>
                    <img className='UneAnnonce-img-annonce' src={require('../../assets/annonce3.jpg')} alt=""/>
                </Link>
            </div>
            <div className='UneAnnonce-button'>
                <button className='UneAnnonce-button-left' ref={refLeft}><FontAwesomeIcon icon={faChevronLeft} /></button>
                <button className='UneAnnonce-button-right' ref={refRight}><FontAwesomeIcon icon={faChevronRight} /></button>
            </div>
            <div className='UneAnnonce-description'>
                <Vendeur nom={nom} prenom={prenom} photo={img_profil} note={note}/>
                <Contenu titre={titre} description={description} prix={prix}/>
            </div>
        </div>
    )
}

export default UneAnnonce;