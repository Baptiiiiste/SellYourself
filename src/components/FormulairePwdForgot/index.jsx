import './FormulairePwdForgot.css'
import { Link} from 'react-router-dom';
import { useNavigate } from 'react-router-dom'
// import { useState } from "react"

function FormulairePwdForgot() {

    const navigate = useNavigate();
    

    const login = async () => {
        navigate("/resetPassword");
    }


    return (
        <div className="FormulairePwdForgot-form">
            <h1>Mot de passe oublié</h1>
            <div method="FormulairePwdForgot-post">
                <div className="FormulairePwdForgot-input">
                    <input type="text" name="email"  placeholder="E-MAIL" required/>
                </div>
                <button onClick={login} className="FormulairePwdForgot-button">CONFIRMER</button>
            </div>
            <div className="FormulairePwdForgot-signup-div">
                Pas encore inscrit ?
                <Link className="FormulairePwdForgot-signup" to="/inscription">S'inscrire</Link>
            </div>
            <div className="FormulairePwdForgot-signin">
                Retour à la
                <Link className="FormulairePwdForgot-signup" to="/connexion">Connexion</Link>
            </div>
        </div>
    );
}

export default FormulairePwdForgot;