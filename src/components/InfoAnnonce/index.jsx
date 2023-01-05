// Import 
import './infoAnnonce.css'
import Loader from '../../components/Loader/index';
import React, { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart, faStar } from '@fortawesome/free-solid-svg-icons';

// Composant qui représente les infomations d'un utilisateur pour une annonce
function Utilisateur({ pseudo, prenom, nom, note, nbNote, description, localisation, image }) {
    // Affichage HTML
    return (
        <div className='InfoAnnonce-InfoEtPhotoVendeur'>
            <img src={image} alt="" className='InfoAnnonce-PhotoVendeur' />
            <div className='InfoAnnonce-InfosVendeur'>
                <p className='InfoAnnonce-NomVendeur'>{pseudo} : {prenom} {nom}</p>
                <p className='InfoAnnonce-Note'>Note: {note}{note !== "Aucune note" && <FontAwesomeIcon icon={faStar} />} ( {nbNote} avis )</p>
                <p className='InfoAnnonce-DescriptionVendeur'>{description}</p>
                <p className='InfoAnnonce-LocalisationVendeur'>{localisation}</p>
            </div>
        </div>
    )
}

// Composant qui représente les infomations d'une annonce
function Annonce({ titre, description, photos }) {
    // Fonction pour afficher les images
    const displayImage = () => {
        if (photos !== undefined) {
            if (photos.length === 0) return <img src={require('../../assets/default.png')} alt="" />
            else {
                return (photos.map((item, index) => (
                    <img src={item} alt="" />
                )));
            }
        }
    }

    // Affichage HTML
    return (
        <div className='InfoAnnonce-Annonce'>
            <p className='InfoAnnonce-NomAnnonce'>{titre}</p>
            <p className='InfoAnnonce-DescriptionAnnonce'>{description}</p>
            <div className='InfoAnnonce-PhotosAnnonce'>
                {displayImage()}
            </div>
        </div>
    )
}

// Composant qui représente les infomations générales d'une annonce
function InfoAnnonce() {
    // Variables
    const params = useParams();
    const [annonce, setAnnonce] = useState([]);
    const [userAll, setUser] = useState([]);
    const user = userAll[0];
    const note = userAll[1];
    const nbNote = userAll[2];

    useEffect(() => {
        getAnnonce();
        getUser();
    }, [])

    let connectedUser = sessionStorage.getItem('user');
    const pseudo = JSON.parse(connectedUser).pseudo;

    // Fonction pour récupérer une annonce
    const getAnnonce = async () => {
        console.log(pseudo + ":" + typeof pseudo);
        let result = await fetch(`http://localhost:5000/api/annonce/${params.annonce}/${pseudo}`, {
            headers: {
                authorization: `bearer ${JSON.parse(sessionStorage.getItem('token'))}`
             }
        });
        result = await result.json();
        if (result.tokenError) {
            return alert(result.tokenError);
        }
        setAnnonce(result);
    }

    // Fonction pour récupérer un utilisateur
    const getUser = async () => {
        let result = await fetch(`http://localhost:5000/api/utilisateur/${params.utilisateur}`, {
            headers: { authorization: `bearer ${JSON.parse(sessionStorage.getItem('token'))}` }
        });
        result = await result.json();
        if (result.tokenError) {
            return alert(result.tokenError);
        }
        setUser(result);
    }

    // Fonction pour ajouter l'annonce en favoris
    const addFavoris = async () => {
        let connectedUser = sessionStorage.getItem("user");

        let result = await fetch(`http://localhost:5000/api/favoris/add/${JSON.parse(connectedUser)._id}/${annonce._id}`, {
            method: "Post",
            headers: {
                'Content-Type': 'Application/json',
                authorization: `bearer ${JSON.parse(sessionStorage.getItem('token'))} `
            }
        });

        result = await result.json();

        if (!result.erreur) {
            sessionStorage.removeItem("user");
            sessionStorage.setItem("user", JSON.stringify(result.user));
            window.location.reload(false);
        }
    }

    
    const isVendu = () => {
        const div = document.getElementsByClassName("InfoAnnonce-isVendu")[0];
        const achat = document.getElementsByClassName("InfoAnnonce-Achat")[0];
        if(div !== undefined){
            if(annonce.vendu){
                achat.style.display = 'none';
                div.style.display = 'block';
            }
        }
    }

    isVendu();

    // Affichage HTML
    return (userAll.length === 0) ?
        (
            <Loader />
        )
        :
        (<div className='InfoAnnonce'>
            <div className='InfoAnnonce-isVendu' style={{display: 'none'}}>
                <p>L'annonce est vendue</p>
            </div>
            <div className='InfoAnnonce-Haut'>
                
                <Utilisateur pseudo={user.pseudo} prenom={user.prenom} nom={user.nom} note={note} nbNote={nbNote} description={user.description} localisation={user.localisation} image={user.profilPic} />
                <p className='InfoAnnonce-PrixAnnonce'> {annonce.prix} €</p>
                <div className='InfoAnnonce-Boutons'>
                    <Link className='InfoAnnonce-Achat' to={'/validation/' + user.pseudo + "/" + annonce._id}>Acheter</Link>
                    <Link className='InfoAnnonce-BoutonMessage' to={'/conversation/' + user.pseudo + "/" + annonce._id}>Contacter</Link>
                </div>
            </div>
            <Annonce titre={annonce.titre} description={annonce.description} photos={annonce.image} />
            <button className='InfoAnnonce-AjoutFav' onClick={addFavoris}>
                <FontAwesomeIcon className='InfoAnnonce-Icon' icon={faHeart} />
                <p>Ajouter aux favoris</p>
            </button>
        </div>
        )
}

export default InfoAnnonce;