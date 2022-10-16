import './FormulaireConnexion.css'
import { Link } from 'react-router-dom';

function FormulaireConnexion() {
    return (
        <div className="FormulaireConnexion-form">
            <h1>CONNEXION</h1>
            <form method="FormulaireConnexion-post">
                <div className="FormulaireConnexion-input">
                    <input type="text" name="login" placeholder="IDENTIFIANT" required/>
                    <input type="password" name="password" placeholder="MOT DE PASSE" required/>
                </div>
                <button className="FormulaireConnexion-button">SE CONNECTER </button>
            </form>
            <div className="FormulaireConnexion-signup-div">
                Pas encore inscrit ?
                <Link className="FormulaireConnexion-signup" to="/inscription">S'inscrire</Link>
            </div>
        </div>
    );
}

export default FormulaireConnexion;