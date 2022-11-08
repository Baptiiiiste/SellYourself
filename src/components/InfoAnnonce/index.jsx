import './infoAnnonce.css'
import React, {useState, useEffect} from 'react';
import { Link, useParams } from 'react-router-dom';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faHeart, faStar} from '@fortawesome/free-solid-svg-icons';

function Utilisateur({pseudo, prenom, nom, note, description, localisation, image}){
    return(
        <div className='InfoAnnonce-InfoEtPhotoVendeur'>
            <img src={require('../../assets/DefaultPP.jpeg')} alt="" className='InfoAnnonce-PhotoVendeur'/>
            <div className='InfoAnnonce-InfosVendeur'>
                    <p className='InfoAnnonce-NomVendeur'>{pseudo} : {prenom} {nom}</p>
                    <div className='InfoAnnonce-NoteVendeur'>
                        <p className='InfoAnnonce-Note'>Note : {note}/5</p>
                        <FontAwesomeIcon className='InfoAnnonce-Star' icon={faStar}/>
                    </div>
                    <p className='InfoAnnonce-DescriptionVendeur'>{description}</p>
                    <p className='InfoAnnonce-LocalisationVendeur'>{localisation}</p>
            </div>
        </div>
    )
}

function Annonce({titre, description, photos}){
    return(
        <div className='InfoAnnonce-Annonce'>
            <p className='InfoAnnonce-NomAnnonce'>{titre}</p>
            <p className='InfoAnnonce-DescriptionAnnonce'>{description}</p>
            <div className='InfoAnnonce-PhotosAnnonce'>
                <img src={require('../../assets/annonce1.jpg')} alt="" />
                <img src={require('../../assets/annonce2.jpg')} alt="" />
                <img src={require('../../assets/annonce3.jpg')} alt="" />
                <img src={require('../../assets/annonce1.jpg')} alt="" />
                <img src={require('../../assets/annonce2.jpg')} alt="" />
                <img src={require('../../assets/annonce3.jpg')} alt="" />
            </div>
        </div>
    )
}

function InfoAnnonce() {
    const params = useParams();

    const [annonce, setAnnonce] = useState([]);
    const [user, setUser] = useState([]);

    useEffect(() => {
        getAnnonce();
        getUser();
    }, [])

    const getAnnonce = async () => {
        let result = await fetch(`http://localhost:5000/api/annonce/${params.annonce}`);
        result = await result.json();
        setAnnonce(result);
    }

    const getUser = async () => {
        let result = await fetch(`http://localhost:5000/api/utilisateur/${params.utilisateur}`);
        result = await result.json();
        setUser(result);
    }

    console.log(user);

    return (
        <div className='InfoAnnonce'>
            <div className='InfoAnnonce-Haut'>
                <Utilisateur pseudo={user.pseudo} prenom={user.prenom} nom={user.nom} note={user.note} description={user.description} localisation={user.localisation} image={user.profilPic}/>
                <p className='InfoAnnonce-PrixAnnonce'> {annonce.prix} €</p>
                <div className='InfoAnnonce-Boutons'>
                    <Link className='InfoAnnonce-Achat' to={'/validation'}>Acheter</Link>
                    <Link className='InfoAnnonce-BoutonMessage' to={'/conversation'}>Contacter</Link>
                </div>
            </div>
            <Annonce titre={annonce.titre} description={annonce.description} photos={annonce.image}/>
            <button className='InfoAnnonce-AjoutFav'>
                <FontAwesomeIcon className='InfoAnnonce-Icon' icon={faHeart} />
                <p>Ajouter aux favoris</p>
            </button>
        </div>
    )
}

export default InfoAnnonce;