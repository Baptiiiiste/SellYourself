import './creerAnnonce.css';
import React from 'react';
import {categories} from '../../assets/data'

function CreerAnnonce() {

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
        const titre = document.querySelector('.CreerAnnonce-Titre').value;
        const description = document.querySelector('.CreerAnnonce-Description').value;
        const prix = document.querySelector('.CreerAnnonce-Prix').value;
        const bien = document.querySelector('CreerAnnonce-Bien');
        const  service = document.querySelector('CreerAnnonce-Service');
        let type;
        if (bien.checked) {
            type = bien.value;
        }
        else{
            type = service.value;
        }
        const categorie = document.querySelector('.CreerAnnonce-Categorie');
        const images = document.querySelectorAll('.CreerAnnonce-img'); 
        let photos = [];
        for(let i = 0; i<images.length; i++){
            photos += images[i].value;
        }
    }

    return(
        <form className="CreerAnnonce-Input">
            <input type="text" placeholder='Titre' className="CreerAnnonce-Titre" maxlength="80" />
            <textarea placeholder='Description' className="CreerAnnonce-Description" maxlength="500"/>
            <input placeholder='Prix' type="number" min='0' max='99999' className="CreerAnnonce-Prix"/>

            <div className='CreerAnnonce-Radio'>
                <fieldset className='CreeAnnonce-RadioBouton'>
                    <legend> Type d'annonce proposée </legend>
                    <div>
                        <input type="radio" className="CreerAnnonce-Bien" id='Bien' name='Type' value="Bien" checked/>
                        <label for="Bien">Bien</label>
                    </div>
                    <div>
                        <input type="radio" className="CreerAnnonce-Service" id='Service' name='Type' value="Service"/>
                        <label for="Service">Service</label>
                    </div>
                </fieldset>
            </div>

            <select name="Categorie" className="CreerAnnonce-Categorie">
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