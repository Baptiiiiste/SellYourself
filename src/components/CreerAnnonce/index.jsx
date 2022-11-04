import './creerAnnonce.css';
import React from 'react';
import {categories} from '../../assets/data'
import { useState } from 'react';

function CreerAnnonce() {

    const [titre, setTitre] = useState("");
    const [description, setDescription] = useState("");
    const [prix, setPrix] = useState("");
    const [categorie, setCategorie] = useState("");
    const [type, setType] = useState("");
    let image;

    const displayImage = async () => {
        const div = document.querySelector('.CreerAnnonce-LesImages');
        const array = document.querySelector('.CreerAnnonce-Image').files;

        for (let i = 0; i<array.length; i++){
            const img = document.createElement('img');
            img.src= "image/" + array[i].name;
            img.className ='CreerAnnonce-img';
            div.appendChild(img);
        }
    }

    const formulaire = async () => {
        image = [];
        const images = document.querySelectorAll('.CreerAnnonce-img');
        for(let i = 0; i<images.length; i++){
            image += images[i].src.replace(/^.*[\\\/]/, '');
        }
        const utilisateurId = JSON.parse(localStorage.getItem('user'))._id;
        let result = await fetch("http://localhost:5000/api/publier", {
            method: 'post',
            body: JSON.stringify({utilisateurId, titre, description, image, prix, type}),
            headers: {
                'Content-Type': 'application/json'
            }
        });
        result = await result.json();

    }

    return(
        <div className="CreerAnnonce-Input">
            <input type="text" placeholder='Titre' className="CreerAnnonce-Titre" maxLength="80" onChange={(ev) => {setTitre(ev.target.value)}}/>
            <textarea placeholder='Description' className="CreerAnnonce-Description" maxLength="500" onChange={(ev) => {setDescription(ev.target.value)}}/>
            <input placeholder='Prix' type="number" min='0' max='99999' className="CreerAnnonce-Prix" onChange={(ev) => {setPrix(ev.target.value)}}/>

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