// Import 
import "./HeaderConversation.css"
import React from 'react';
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faStar } from "@fortawesome/free-regular-svg-icons";
import { faX } from "@fortawesome/free-solid-svg-icons";

// Composant qui représente les information sur l'annonce dans la page d'une conversation
function HeaderConversation({ image, titre, description, id, vendu, user}) {
  // Variable
  const connectedUser = sessionStorage.getItem("user");

  // Fonction pour afficher les images
  const displayImage = () => {
    if (image !== undefined) {
      if (image.length === 0) return <img className="HeaderConversation-image" src={require('../../assets/default.png')} alt="" />
      else return <img className="HeaderConversation-image" src={image[0]} alt="" />
    }
  }

  // Fonction pour changer l'affichage si l'annonce est vendu
  const isVendu = async () => {
    let result = await fetch(`https://api.sellyourself.fr/api/getAchat`, {
      method: "Post",
      body: JSON.stringify({ annonce: id }),
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Credentials':true,
        'Access-Control-Allow-Methods':'POST, GET',
        'Content-Type': 'Application/json',
        authorization: `bearer ${JSON.parse(sessionStorage.getItem('token'))}`
      }
    });
    result = await result.json();

    const div = document.getElementsByClassName("HeaderConversation-div-note")[0];
    if(div !== undefined){
      if(vendu && JSON.parse(connectedUser).pseudo !== user && result.achat.acheteur === JSON.parse(connectedUser).pseudo){
        div.style.display = 'block';
      }
    }
  }

  // Fonction pour changer l'affichage si l'annonce est déjà notée
  const isNoted = async () => {
    let result = await fetch(`https://api.sellyourself.fr/api/isNoted/${id}/${user}/${JSON.parse(sessionStorage.getItem('user')).pseudo}`, {
      method: "Get",
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Credentials':true,
        'Access-Control-Allow-Methods':'POST, GET',
        'Content-Type': 'Application/json',
        authorization: `bearer ${JSON.parse(sessionStorage.getItem('token'))}`
      }
    });
    result = await result.json();

    if(result.isNoted && vendu && JSON.parse(connectedUser).pseudo !== user){
      const divNote = document.getElementsByClassName("HeaderConversation-div-note")[0];
      const div = document.getElementsByClassName("HeaderConversation-div-isNoted")[0];

      if(divNote !== undefined && div !== undefined){
        divNote.style.display = 'none';
        div.style.display = 'block';

        for(let i=1; i<=result.note; i++){
          let button = document.getElementById("buttonNoted-"+i);

          if(button !== undefined){
            button.style.color = '#d48002'
          }
        }
      }
    }
  }

  // Fonction pour ajouter une note
  const addNote = async (note) => {
    await fetch(`https://api.sellyourself.fr/api/note/${id}/${user}/${JSON.parse(sessionStorage.getItem('user')).pseudo}/${note}`, {
      method: "Post",
      headers: {
        'Content-Type': 'Application/json',
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Credentials':true,
        'Access-Control-Allow-Methods':'POST, GET',
        authorization: `bearer ${JSON.parse(sessionStorage.getItem('token'))}`
      }
    });

    await fetch(`https://api.sellyourself.fr/api/utilisateur/addNotif`, {
      method: 'Post',
      body: JSON.stringify({ type: "note", content: `Votre annonce ${titre} a été noté ${note}/5`, destinataire: user }),
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Credentials':true,
        'Access-Control-Allow-Methods':'POST, GET',
        authorization: `bearer ${JSON.parse(sessionStorage.getItem('token'))}`
      }
    });
    window.location.reload(false);
  }

  // Fonction d'affichage des étoiles pour la note
  const colorButton = (note) => {
    for(let i=1; i<=note; i++){
      let button = document.getElementById("button-"+i);
      if(button !== undefined){
        button.style.color = '#d48002'
      }
    }
  }

  // Fonction d'affichage des étoiles pour la note
  const deColorButton = (note) => {
    for(let i=1; i<=note; i++){
      let button = document.getElementById("button-"+i);
      if(button !== undefined){
        button.style.color = '#9A9797'
      }
    }
  }

  // Fonction pour supprimer une note
  const deleteNote = async () => {
    await fetch(`https://api.sellyourself.fr/api/note/delete`, {
      method: "Post",
      body: JSON.stringify({annonce: id, vendeur: user, user: JSON.parse(sessionStorage.getItem('user'))._id}),
      headers: {
        'Content-Type': 'Application/json',
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Credentials':true,
        'Access-Control-Allow-Methods':'POST, GET',
        authorization: `bearer ${JSON.parse(sessionStorage.getItem('token'))}`
      }
    });
    window.location.reload(false);
  }

  isVendu();
  isNoted();

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
        <Link className="HeaderConversation-lien" to={"/annonce/" + user + "/" + id}>Voir l'annonce</Link>
        <div className="HeaderConversation-div-isNoted" style={{display: 'none'}}>
          <button><FontAwesomeIcon id="buttonNoted-1" icon={faStar}/></button>
          <button><FontAwesomeIcon id="buttonNoted-2" icon={faStar}/></button>
          <button><FontAwesomeIcon id="buttonNoted-3" icon={faStar}/></button>
          <button><FontAwesomeIcon id="buttonNoted-4" icon={faStar}/></button>
          <button><FontAwesomeIcon id="buttonNoted-5" icon={faStar}/></button>
          <button className="HeaderConversation-delete" onClick={deleteNote}><FontAwesomeIcon icon={faX}/></button>
        </div>
        <div className="HeaderConversation-div-note" style={{display: 'none'}}>
          <button onClick={() => addNote(1)} onMouseOver={() => colorButton(1)} onMouseLeave={() => deColorButton(1)}><FontAwesomeIcon id="button-1" icon={faStar}/></button>
          <button onClick={() => addNote(2)} onMouseOver={() => colorButton(2)} onMouseLeave={() => deColorButton(2)}><FontAwesomeIcon id="button-2" icon={faStar}/></button>
          <button onClick={() => addNote(3)} onMouseOver={() => colorButton(3)} onMouseLeave={() => deColorButton(3)}><FontAwesomeIcon id="button-3" icon={faStar}/></button>
          <button onClick={() => addNote(4)} onMouseOver={() => colorButton(4)} onMouseLeave={() => deColorButton(4)}><FontAwesomeIcon id="button-4" icon={faStar}/></button>
          <button onClick={() => addNote(5)} onMouseOver={() => colorButton(5)} onMouseLeave={() => deColorButton(5)}><FontAwesomeIcon id="button-5" icon={faStar}/></button>
        </div>
      </div>
    </div>
  )
}

export default HeaderConversation;