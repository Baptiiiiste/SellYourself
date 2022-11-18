import './infoAnnonce.css'
import Loader from '../../components/Loader/index';
import React, {useState, useEffect} from 'react';
import { Link, useParams } from 'react-router-dom';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faHeart, faStar} from '@fortawesome/free-solid-svg-icons';
import axios from 'axios';

function Utilisateur({pseudo, prenom, nom, note, nbNote, description, localisation, image}){

    // const [data,setData] = useState([])
    // useEffect(()=>{
    //     axios.get('http://localhost:5000')
    //     .then((res)=>setData(res.data))
    //     .catch((err)=> console.log(err,"it has an error"));
    // })
    
    return(
        <div className='InfoAnnonce-InfoEtPhotoVendeur'>
            {/* {
                data.map((singleData)=>{
                    const base64String = btoa(
                        String.fromCharCode(...new Uint8Array((singleData.image.data.data)))
                    );
                    return <img src={`data:image/png;base64,${base64String}`} alt="" className='InfoAnnonce-PhotoVendeur'/>
                })

            } */}
            {/* <img src={require('../../assets/DefaultPP.jpeg')} alt="" className='InfoAnnonce-PhotoVendeur'/> */}
            <div className='InfoAnnonce-InfosVendeur'>
                
                    <p className='InfoAnnonce-NomVendeur'>{pseudo} : {prenom} {nom}</p>
                    <p className='InfoAnnonce-Note'>Note: {note}{ note !== "Aucune note" && <FontAwesomeIcon icon={faStar} />} ( {nbNote} avis )</p>
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

    const [loader, setLoader] = useState(false);

    const params = useParams();

    const [annonce, setAnnonce] = useState([]);
    const [userAll, setUser] = useState([]);

    useEffect(() => {
        // setTimeout(() => {
        //     setLoader(false);
        // },1000);
        getAnnonce();
        getUser();
    }, [])


    const getAnnonce = async () => {
        let result = await fetch(`http://localhost:5000/api/annonce/${params.annonce}`, {
            headers: { authorization: `bearer ${JSON.parse(sessionStorage.getItem('token'))}` }
        });
        result = await result.json();
        if(result.tokenError){
            return alert(result.tokenError);
        }
        setAnnonce(result);
    }

    const getUser = async () => {
        let result = await fetch(`http://localhost:5000/api/utilisateur/${params.utilisateur}`, {
            headers: { authorization: `bearer ${JSON.parse(sessionStorage.getItem('token'))}` }
        });
        result = await result.json();
        if(result.tokenError){
            return alert(result.tokenError);
        }
        setUser(result);
    }

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

        if(result.erreur) {
            return alert(result.erreur);
        } else {
            sessionStorage.removeItem("user");
            sessionStorage.setItem("user", JSON.stringify(result.user));
            window.location.reload(false);
        }
    }

    console.log(userAll)
    const user = userAll[0];
    const note = userAll[1];
    const nbNote = userAll[2];

    return (userAll.length === 0) ?
        (
        <Loader/> 
        )
        :
        (  <div className='InfoAnnonce'>
                <div className='InfoAnnonce-Haut'>
                    <Utilisateur pseudo={user.pseudo} prenom={user.prenom} nom={user.nom} note={note} nbNote={nbNote} description={user.description} localisation={user.localisation} image={user.profilPic}/>
                    <p className='InfoAnnonce-PrixAnnonce'> {annonce.prix} €</p>
                    <div className='InfoAnnonce-Boutons'>
                        <Link className='InfoAnnonce-Achat' to={'/validation/' + user.pseudo + "/" + annonce._id}>Acheter</Link>
                        <Link className='InfoAnnonce-BoutonMessage' to={'/conversation/' + user.pseudo + "/" + annonce._id}>Contacter</Link>
                    </div>
                </div>
                <Annonce titre={annonce.titre} description={annonce.description} photos={annonce.image}/>
                <button className='InfoAnnonce-AjoutFav' onClick={addFavoris}>
                    <FontAwesomeIcon className='InfoAnnonce-Icon' icon={faHeart} />
                    <p>Ajouter aux favoris</p>
                </button>
            </div>)
}

export default InfoAnnonce;