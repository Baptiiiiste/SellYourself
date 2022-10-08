import { Link } from 'react-router-dom';
import './creerAnnonce.css';

function CreerAnnonce() {
    return(
        <div className="principale">
            <input type="text" placeholder='Titre' id="Titre" required name="Titre" maxlength="50"  />
            <textarea placeholder='Description' id="Description" required name="Titre" maxlength="250" />
        </div>
    )
}


export default CreerAnnonce;