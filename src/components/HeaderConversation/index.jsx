import "./HeaderConversation.css"
import React from 'react';
import { Link, useParams } from "react-router-dom";

function HeaderConversation({image, titre, description}) {
  const param = useParams();

  const displayImage = () => {
    if(image !== undefined){
      if(image.length === 0) return <img className="HeaderConversation-image" src={require('../../assets/default.png')}/>
      else return <img className="HeaderConversation-image" src={image}/>
    }
  }

  return(
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