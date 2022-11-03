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
    let photos = [];

    const image = async () => {
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
        const images = document.querySelectorAll('.CreerAnnonce-img');
        for(let i = 0; i<images.length; i++){
            photos += images[i].value;
        }
    }

    return(
        <form className="CreerAnnonce-Input">
            <input type="text" placeholder='Titre' className="CreerAnnonce-Titre" maxlength="80" onChange={(ev) => {setTitre(ev.target.value)}}/>
            <textarea placeholder='Description' className="CreerAnnonce-Description" maxlength="500" onChange={(ev) => {setDescription(ev.target.value)}}/>
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
            <input type="file" className="CreerAnnonce-Image" id="image" name="Image" accept=".jpg, .jpeg, .png" multiple onInput={image}></input>

            <p>Format .png, .jpeg et .jpg uniquement</p> 

            <div className='CreerAnnonce-BoutonSubmit'>
                <input type='submit' value="Publier l'annonce" className="CreerAnnonce-Submit" onClick={formulaire}/>
            </div>
        </form>
    )
}


export default CreerAnnonce;