import './infoAnnonce.css'
import React, {useState, useEffect} from 'react';
import { Link, useParams } from 'react-router-dom';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faHeart, faStar} from '@fortawesome/free-solid-svg-icons';

function Utilisateur({nom, note, description, localisation, image}){
    return(
        <div className='InfoAnnonce-InfoEtPhotoVendeur'>
            <img src={require('../../assets/DefaultPP.jpeg')} alt="" className='InfoAnnonce-PhotoVendeur'/>
            <div className='InfoAnnonce-InfosVendeur'>
                    <p className='InfoAnnonce-NomVendeur'>{nom}</p>
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

function Annonce(){
    const params = useParams();
    console.log(params.id);

    const [annonce, setAnnonce] = useState([]);

    useEffect(() => {
        getAnnonce();
    }, [])

    const getAnnonce = async () => {
        let result = await fetch(`http://localhost:5000/api/annonce/${params.id}`);
        result = await result.json();
        setAnnonce(result);
    }

    const titre = annonce[0].titre;
    const description = annonce[0].description;

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

function InfoAnnonce({nom, note, descriptionVendeur, localisation, image, titre, descriptionAnnonce, photos, prix}) {
    return (
        <div className='InfoAnnonce'>
            <div className='InfoAnnonce-Haut'>
                <Utilisateur nom={nom} note={note} description={descriptionVendeur} localisation={localisation} image={image}/>
                <p className='InfoAnnonce-PrixAnnonce'> {prix} €</p>
                <div className='InfoAnnonce-Boutons'>
                    <Link className='InfoAnnonce-Achat' to={'/validation'}>Acheter</Link>
                    <Link className='InfoAnnonce-BoutonMessage' to={'/conversation'}>Contacter</Link>
                </div>
            </div>
            <Annonce titre={titre} description={descriptionAnnonce} photos={photos}/>
            <button className='InfoAnnonce-AjoutFav'>
                <FontAwesomeIcon className='InfoAnnonce-Icon' icon={faHeart} />
                <p>Ajouter aux favoris</p>
            </button>
        </div>
    )
}

export default InfoAnnonce;