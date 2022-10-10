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
                <div className="FormulaireConnexion-buttons">
                    <div className="FormulaireConnexion-other">
                        <input type="submit" name="submit" value="SE CONNECTER"/>
                    </div>
                </div>
            </form>
            <div className="FormulaireConnexion-signup-div">
                Pas encore inscrit ?
                <Link className="FormulaireConnexion-signup" to="/inscription">S'inscrire</Link>
            </div>
        </div>
    );
}

export default FormulaireConnexion;