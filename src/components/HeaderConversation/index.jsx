// Import 
import "./HeaderConversation.css"
import React from 'react';
import { Link, useParams } from "react-router-dom";

// Composant qui représente les information sur l'annonce dans la page d'une conversation
function HeaderConversation({ image, titre, description }) {
  // Variable
  const param = useParams();

  // Fonction pour afficher les images
  const displayImage = () => {
    if (image !== undefined) {
      if (image.length === 0) return <img className="HeaderConversation-image" src={require('../../assets/default.png')} alt="" />
      else return <img className="HeaderConversation-image" src={image[0]} alt="" />
    }
  }

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
      <Link className="HeaderConversation-lien" to={"/annonce/" + param.utilisateur + "/" + param.annonce}>Voir l'annonce</Link>
    </div>
  )
}

export default HeaderConversation;