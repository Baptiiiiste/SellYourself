// Import 
import "./HeaderConversation.css"
import React from 'react';
import { Link, useParams } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar } from "@fortawesome/free-regular-svg-icons";

// Composant qui représente les information sur l'annonce dans la page d'une conversation
function HeaderConversation({ image, titre, description, vendu, user}) {
  // Variable
  const param = useParams();
  const connectedUser = sessionStorage.getItem("user");

  // Fonction pour afficher les images
  const displayImage = () => {
    if (image !== undefined) {
      if (image.length === 0) return <img className="HeaderConversation-image" src={require('../../assets/default.png')} alt="" />
      else return <img className="HeaderConversation-image" src={image[0]} alt="" />
    }
  }

  const isVendu = () => {
    const div = document.getElementsByClassName("HeaderConversation-div-note")[0];
    if(div !== undefined){
        console.log(div);
        if(vendu && JSON.parse(connectedUser).pseudo !== user){
            div.style.display = 'none';
        }
    }
  }

  const addNote = async (note) => {
    let a = await fetch(`http://localhost:5000/api/note/${user}/${JSON.parse(sessionStorage.getItem('user')).pseudo}/${note}`, {
      method: "Post",
      headers: {
        'Content-Type': 'Application/json',
        authorization: `bearer ${JSON.parse(sessionStorage.getItem('token'))}`
      }
    });
  }

  isVendu();

  // Affichage HTML
  return (
    <div className="HeaderConversation">
      <div className="HeaderConversation-annonce">
        {displayImage()}
        <div className="HeaderConversation-contenu">
          <p className="HeaderConversation-titre">{titre}</p>
          <p className="HeaderConversation-description">{description}</p>
        </div>
      </div>
      <div className="HeaderConversation-div-lien">
        <Link className="HeaderConversation-lien" to={"/annonce/" + param.utilisateur + "/" + param.annonce}>Voir l'annonce</Link>
        <div className="HeaderConversation-div-note">
          <button className="HeaderConversation-note" onClick={() => addNote(1)}><FontAwesomeIcon icon={faStar}/></button>
          <button className="HeaderConversation-note" onClick={() => addNote(2)}><FontAwesomeIcon icon={faStar}/></button>
          <button className="HeaderConversation-note" onClick={() => addNote(3)}><FontAwesomeIcon icon={faStar}/></button>
          <button className="HeaderConversation-note" onClick={() => addNote(4)}><FontAwesomeIcon icon={faStar}/></button>
          <button className="HeaderConversation-note" onClick={() => addNote(5)}><FontAwesomeIcon icon={faStar}/></button>
        </div>
      </div>
    </div>
  )
}

export default HeaderConversation;