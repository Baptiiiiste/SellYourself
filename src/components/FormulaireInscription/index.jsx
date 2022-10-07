import './FormulaireInscription.css'
import { Link } from 'react-router-dom';

function FormulaireInscription() {
    return (
        <div className="form">
            <h1>INSCRIPTION</h1>
            <form method="post">
                <div className="input">
                    <input type="text" name="login" placeholder="IDENTIFIANT" required/>
                    <input type="email" name="email" placeholder="E-MAIL" required/>
                    <input type="password" name="password" placeholder="MOT DE PASSE" required/>
                </div>
                <div className="buttons">
                    <div className="other">
                        <input type="submit" name="submit" value="S'INSCRIRE"/>
                    </div>
                </div>
            </form>
            <div className="signin-div">
                Déja inscrit ?
                <Link className="signin" to="/connexion">Se connecter</Link>
            </div>
        </div>
    );
}

export default FormulaireInscription;