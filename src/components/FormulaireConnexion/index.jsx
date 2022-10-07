import './FormulaireConnexion.css'
import { Link } from 'react-router-dom';

function FormulaireConnexion() {
    return (
        <div className="formulaire">
            <div className="form">
                <h1>CONNEXION</h1>
                <form method="post">
                    <div className="input">
                        <input type="text" name="login" placeholder="LOGIN" required/>
                        <input type="password" name="password" placeholder="PASSWORD" required/>
                    </div>
                    <div className="buttons">
                        <div className="other">
                            <input type="submit" name="submit" value="SE CONNECTER"/>
                        </div>
                    </div>
                </form>
                <div className="signup-div">
                    <Link className="signup" href="https://github.com/baptiiiiste/">Pas encore inscrit ? Sign up</Link>
                </div>
            </div>
            <div className="entrediv"></div>
        </div>
    );
}

export default FormulaireConnexion;