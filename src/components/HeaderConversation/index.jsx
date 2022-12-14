// Import 
import "./HeaderConversation.css"
import React from 'react';
import { Link, useParams } from "react-router-dom";

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
    const div = document.getElementsByClassName("HeaderConversation-note")[0];
    if(div !== undefined){
        if(vendu && JSON.parse(connectedUser).pseudo !== user){
            div.style.display = 'block';
        }
    }
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
        <Link className="HeaderConversation-note" style={{display: 'none'}}>Note</Link>
      </div>
    </div>
  )
}

export default HeaderConversation;