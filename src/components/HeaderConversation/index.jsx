// Import 
import "./HeaderConversation.css"
import React from 'react';
import { Link, useNavigate, useParams } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faStar } from "@fortawesome/free-regular-svg-icons";
import { useEffect } from "react";

// Composant qui représente les information sur l'annonce dans la page d'une conversation
function HeaderConversation({ image, titre, description, id, vendu, user}) {
  // Variable
  const param = useParams();
  const connectedUser = sessionStorage.getItem("user");
  const nav = useNavigate();

  // useEffect(() => {
  //   isVendu();
  //   isNoted();
  // }, [])

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
      if(vendu && JSON.parse(connectedUser).pseudo !== user){
        div.style.display = 'block';
      }
    }
  }

  const isNoted = async () => {
    let result = await fetch(`http://localhost:5000/api/isNoted/${id}/${user}/${JSON.parse(sessionStorage.getItem('user')).pseudo}`, {
      method: "Get",
      headers: {
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
        for(var i=1; i<=result.note; i++){
          let button = document.getElementById("buttonNoted-"+i);
          if(button !== undefined){
            button.style.color = '#d48002'
          }
        }
      }
    }
  }

  const addNote = async (note) => {
    let res = await fetch(`http://localhost:5000/api/note/${id}/${user}/${JSON.parse(sessionStorage.getItem('user')).pseudo}/${note}`, {
      method: "Post",
      headers: {
        'Content-Type': 'Application/json',
        authorization: `bearer ${JSON.parse(sessionStorage.getItem('token'))}`
      }
    });
    nav("/")
  }

  const colorButton = (note) => {
    for(var i=1; i<=note; i++){
      let button = document.getElementById("button-"+i);
      if(button !== undefined){
        button.style.color = '#d48002'
      }
    }
  }

  const deColorButton = (note) => {
    for(var i=1; i<=note; i++){
      let button = document.getElementById("button-"+i);
      if(button !== undefined){
        button.style.color = '#9A9797'
      }
    }
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
        <Link className="HeaderConversation-lien" to={"/annonce/" + param.utilisateur + "/" + param.annonce}>Voir l'annonce</Link>
        <div className="HeaderConversation-div-isNoted" style={{display: 'none'}}>
          <button className="HeaderConversation-note"><FontAwesomeIcon id="buttonNoted-1" icon={faStar}/></button>
          <button className="HeaderConversation-note"><FontAwesomeIcon id="buttonNoted-2" icon={faStar}/></button>
          <button className="HeaderConversation-note"><FontAwesomeIcon id="buttonNoted-3" icon={faStar}/></button>
          <button className="HeaderConversation-note"><FontAwesomeIcon id="buttonNoted-4" icon={faStar}/></button>
          <button className="HeaderConversation-note"><FontAwesomeIcon id="buttonNoted-5" icon={faStar}/></button>
        </div>
        <div className="HeaderConversation-div-note" style={{display: 'none'}}>
          <button className="HeaderConversation-note" onClick={() => addNote(1)} onMouseOver={() => colorButton(1)} onMouseLeave={() => deColorButton(1)}><FontAwesomeIcon id="button-1" icon={faStar}/></button>
          <button className="HeaderConversation-note" onClick={() => addNote(2)} onMouseOver={() => colorButton(2)} onMouseLeave={() => deColorButton(2)}><FontAwesomeIcon id="button-2" icon={faStar}/></button>
          <button className="HeaderConversation-note" onClick={() => addNote(3)} onMouseOver={() => colorButton(3)} onMouseLeave={() => deColorButton(3)}><FontAwesomeIcon id="button-3" icon={faStar}/></button>
          <button className="HeaderConversation-note" onClick={() => addNote(4)} onMouseOver={() => colorButton(4)} onMouseLeave={() => deColorButton(4)}><FontAwesomeIcon id="button-4" icon={faStar}/></button>
          <button className="HeaderConversation-note" onClick={() => addNote(5)} onMouseOver={() => colorButton(5)} onMouseLeave={() => deColorButton(5)}><FontAwesomeIcon id="button-5" icon={faStar}/></button>
        </div>
      </div>
    </div>
  )
}

export default HeaderConversation;