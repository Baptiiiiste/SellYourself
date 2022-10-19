import './creerAnnonce.css';

function CreerAnnonce() {
    return(
        <form className="CreerAnnonce-Input" method='post'>
            <input type="text" placeholder='Titre' className="CreerAnnonce-Titre" maxlength="80" />
            <textarea placeholder='Description' className="CreerAnnonce-Description" maxlength="500"/>
            <input placeholder='Prix' type="text" className="CreerAnnonce-Prix" maxLength="7"/>

            <div className='CreerAnnonce-Radio'>
                <div className='CreeAnnonce-RadioBouton'>
                    <div>
                        <input type="radio" className="CreerAnnonce-Bien" value="Bien" checked/>
                        <label for="Bien">Bien</label>
                    </div>
                    <div>
                        <input type="radio" className="CreerAnnonce-Service" value="Service"/>
                        <label for="Service">Service</label>
                    </div>
                </div>
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

            <input type="file" className="CreerAnnonce-Image" required name="Image" accept="image/png, image/jpeg image/jpg" multiple/>

            <p>Format .png, .jpeg et .jpg uniquement</p> 

            <div className='CreerAnnonce-BoutonSubmit'>
                <input type='submit' value="Publier l'annonce" className="CreerAnnonce-Submit" />
            </div>
        </form>
    )
}


export default CreerAnnonce;