import './creerAnnonce.css';
import React, { useRef, useEffect } from 'react';

function addImg(e) {
    const img = document.createElement('img');
    const div = document.querySelector('.CreerAnnonce-LesImages');
    img.src= "image/" + e.target.files[0].name;
    img.className ='CreerAnnonce-img';
    console.log(div);
    div.appendChild(img);
}

function CreerAnnonce() {
    const ref = React.createRef();

    useEffect(() => {
        const input = ref.current;
        input.addEventListener('input', addImg);
    }, []);

    return(
        <form className="CreerAnnonce-Input" method='post'>
            <input type="text" placeholder='Titre' className="CreerAnnonce-Titre" maxlength="80" />
            <textarea placeholder='Description' className="CreerAnnonce-Description" maxlength="500"/>
            <input placeholder='Prix' type="text" className="CreerAnnonce-Prix" maxLength="7"/>

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
                <option value="1">Catégorie 1</option>
                <option value="2">Catégorie 2</option>
                <option value="3">Catégorie 3</option>
                <option value="4">Catégorie 4</option>
                <option value="5">Catégorie 5</option>
                <option value="6">Catégorie 6</option>
            </select>

            <div className='CreerAnnonce-LesImages'>

            </div>

            <label for="image" className='CreerAnnonce-Label'>Ajouter une photo</label>
            <input type="file" className="CreerAnnonce-Image" id="image" name="Image" accept=".jpg, .jpeg, .png" multiple ref={ref}></input>

            <p>Format .png, .jpeg et .jpg uniquement</p> 

            <div className='CreerAnnonce-BoutonSubmit'>
                <input type='submit' value="Publier l'annonce" className="CreerAnnonce-Submit" />
            </div>
        </form>
    )
}


export default CreerAnnonce;