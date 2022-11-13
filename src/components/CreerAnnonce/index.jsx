import './creerAnnonce.css';
import React from 'react';
import {categories} from '../../assets/data'
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function CreerAnnonce() {

    const navigate = useNavigate();

    const connectedUser = sessionStorage.getItem("user");

    const [titre, setTitre] = useState("");
    const [description, setDescription] = useState("");
    const [prix, setPrix] = useState("");
    const [categorie, setCategorie] = useState("Autre");
    const [type, setType] = useState("Bien");
    let image;

    const displayImage = async () => {
        const div = document.querySelector('.CreerAnnonce-LesImages');
        const array = document.querySelector('.CreerAnnonce-Image').files;

        const nbImage = array.length + (document.querySelectorAll('.CreerAnnonce-img')).length;

        if(nbImage > 10){
            alert("Vous ne pouvez choisir plus de 10 images !")
        }
        else{
            for (let i = 0; i<array.length; i++){
                if(array[i].name.split('.').pop() === 'jpeg' || array[i].name.split('.').pop() === 'jpg' || array[i].name.split('.').pop() === 'jpng'){
                    const img = document.createElement('img');
                    img.src= "image/" + array[i].name;
                    img.className ='CreerAnnonce-img';
                    div.appendChild(img);
                }
            }
        }
    }

    const formulaire = async () => {
        const nbImage = (document.querySelectorAll('.CreerAnnonce-img')).length;
        if(!titre || !prix || nbImage === 0 || prix > 99999){
            alert("Vous devez renseigner au moins le titre, le prix de l'annonce ainsi qu'une image.");
        }else if(titre && prix && nbImage > 0 && prix <= 99999){
            if(titre && /[\t\r\n]|(--[^\r\n]*)|(\/\*[\w\W]*?(?=\*)\*\/)/gi.test(titre)){
                alert("Le titre est invalide");
            }
            if(description && /[\t\r\n]|(--[^\r\n]*)|(\/\*[\w\W]*?(?=\*)\*\/)/gi.test(description)){
                alert("La description est invalide");
            }
            image = [];
            const images = document.querySelectorAll('.CreerAnnonce-img');
            for(let i = 0; i<images.length; i++){
                if(images[i].src.split('.').pop() === 'jpeg' || images[i].src.split('.').pop() === 'jpg' || images[i].src.split('.').pop() === 'jpng'){
                }
            }
            let result = await fetch(`http://localhost:5000/api/publier/${JSON.parse(connectedUser).pseudo}`, {
                method: 'Post',
                body: JSON.stringify({titre, description, image, prix, type, categorie}),
                headers: {
                    'Content-Type': 'Application/json',
                    authorization: `bearer ${JSON.parse(sessionStorage.getItem('token'))}`
                }
            });
            result = await result.json();
            if(result.tokenError){
                return alert(result.tokenError);
            }
            sessionStorage.removeItem("user");
            sessionStorage.setItem("user", JSON.stringify(result.user));
            navigate("/Toutes catégories");
        }
    }

    return(
        <div className="CreerAnnonce-Input">
            <input type="text"
                    placeholder='Titre' 
                    className="CreerAnnonce-Titre" 
                    maxLength="80" 
                    onChange={(ev) => {setTitre(ev.target.value)}}/>

            <textarea placeholder='Description' 
                    className="CreerAnnonce-Description" 
                    maxLength="500" 
                    onChange={(ev) => {setDescription(ev.target.value)}}/>

            <input placeholder='Prix' 
                    type="number" 
                    min = "0"
                    max="99999" 
                    className="CreerAnnonce-Prix" 
                    onChange={(ev) => {setPrix(ev.target.value)}}/>

            <div className='CreerAnnonce-Radio'>
                <fieldset className='CreeAnnonce-RadioBouton'>
                    <legend> Type d'annonce proposée </legend>
                    <div>
                        <input type="radio" className="CreerAnnonce-Bien" id='Bien' name='Type' value="Bien" checked onChange={(ev) => {setType(ev.target.value)}}/>
                        <label for="Bien">Bien</label>
                    </div>
                    <div>
                        <input type="radio" className="CreerAnnonce-Service" id='Service' name='Type' value="Service" onChange={(ev) => {setType(ev.target.value)}}/>
                        <label for="Service">Service</label>
                    </div>
                </fieldset>
            </div>

            <select name="Categorie" className="CreerAnnonce-Categorie" onChange={(ev) => {setCategorie(ev.target.value)}}>
                <option value="">-- Choisissez une catégorie --</option>
                {categories.map(({ name }, index) => (
                    <option value={name}>{name}</option>
                ))}
            </select>

            <div className='CreerAnnonce-LesImages'>

            </div>

            <label for="image" className='CreerAnnonce-Label'>Ajouter une photo</label>
            <input type="file" className="CreerAnnonce-Image" id="image" name="Image" accept=".jpg, .jpeg, .png" multiple onInput={displayImage}></input>

            <p>Format .png, .jpeg et .jpg uniquement</p> 
            <div className='CreerAnnonce-BoutonSubmit'>
                <button className="CreerAnnonce-Submit" onClick={formulaire}> Publier l'annonce </button>
            </div>
            
        </div>
    )
}

export default CreerAnnonce;