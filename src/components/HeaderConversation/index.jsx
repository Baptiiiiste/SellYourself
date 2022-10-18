import "./HeaderConversation.css"
import React from 'react';
import { Link } from "react-router-dom";

function HeaderConversation({image, titre, description}) {
  return(
    <div className="HeaderConversation">
      <div className="HeaderConversation-annonce">
        <img className="HeaderConversation-image" src={require("../../assets/annonce1.jpg")} alt=""/>
        <div className="HeaderConversation-contenu">
            <p className="HeaderConversation-titre">{titre}</p>
            <p className="HeaderConversation-description">{description}</p>
        </div>
      </div>
        <Link className="HeaderConversation-lien" to="/annonce">Voir l'annonce</Link>
    </div>
  )
}

export default HeaderConversation;