import './creerAnnonce.css';

function CreerAnnonce() {
    return(
        <div className="CreerAnnonce-principale">
            <div className="CreerAnnonce-Input">
                <input type="text" placeholder='Titre' id="CreerAnnonce-Titre" required name="Titre" maxlength="50"  />
                <textarea placeholder='Description' id="CreerAnnonce-Description" required name="Description" maxlength="50"/>
                <input type="text" placeholder='Prix (en euros)' id="CreerAnnonce-Prix" required name="Prix" maxLength="7"/>
                <select name="Categorie" id="CreerAnnonce-Categorie">
                    <option value="">--Choisissez une catégorie--</option>
                    <option value="1">Catégorie 1</option>
                    <option value="2">Catégorie 2</option>
                    <option value="3">Catégorie 3</option>
                    <option value="4">Catégorie 4</option>
                    <option value="5">Catégorie 5</option>
                    <option value="6">Catégorie 6</option>
                </select>
                <div className="ImageAnnonce">

                </div>
                <input type="file" placeholder='Ajouter une photo' id="CreerAnnonce-Image" required name="Image" accept="image/png, image/jpeg image/jpg" multiple/>

                <p>Format .png .jpeg et .jpg uniquement</p> 
                <div className='CreerAnnonce-BoutonSubmit'>
                    <input type='submit' value="Publier l'annonce" id="CreerAnnonce-Submit" />
                </div>
            </div>

           
        </div>

    )
}


export default CreerAnnonce;