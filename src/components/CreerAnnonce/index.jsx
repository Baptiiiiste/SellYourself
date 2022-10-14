import './creerAnnonce.css';

function CreerAnnonce() {
    return(
        <div className="CreerAnnonce-principale">
            <form className="CreerAnnonce-Input" method='post'>
                <input type="text" id="CreerAnnonce-Titre" required name="Titre" maxlength="80" class="question"  />
                <label for="Titre"><span>Titre</span></label>
                <textarea id="CreerAnnonce-Description" required name="Description" maxlength="500" class="question"/>
                <label for="Description"><span className='CreerAnnonce-TextDescription'>Description</span></label>
                <input type="text" id="CreerAnnonce-Prix" required name="Prix" maxLength="7" class="question"/>
                <label for="Prix"><span>Prix (en €)</span></label>
                <div className='CreerAnnonce-Radio'>
                    <div>
                        <input type="radio" id="Bien" name="ChoixType" value="Bien" checked/>
                        <label for="Bien">Bien</label>
                    </div>
                    <div>
                        <label for="Service">Service</label>
                        <input type="radio" id="Service" name="ChoixType" value="Service"/>
                    </div>
                </div>
                <select name="Categorie" id="CreerAnnonce-Categorie">
                    <option value="">-- Choisissez une catégorie --</option>
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
            </form>
        </div>

    )
}


export default CreerAnnonce;