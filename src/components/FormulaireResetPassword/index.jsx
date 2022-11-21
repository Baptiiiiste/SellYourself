import './FormulaireResetPassword.css'
import { Link} from 'react-router-dom';
import { useNavigate } from 'react-router-dom'
// import { useState } from "react"

function FormulaireResetPassword() {

    const navigate = useNavigate();
    

    const login = async () => {
        navigate("/resetPassword");
    }


    return (
        <div className="FormulaireResetPassword-form">
            <h1>Modifier le mot de passe</h1>
            <div method="FormulaireResetPassword-post">
                <div className="FormulaireResetPassword-input">
                    <input type="text" name="new-password"  placeholder="NOUVEAU MOT DE PASSE" required/>
                </div>
                <div className="FormulaireResetPassword-input">
                    <input type="text" name="confirm-new-password"  placeholder="CONFIRMER LE MOT DE PASSE" required/>
                </div>
                <button onClick={login} className="FormulaireResetPassword-button">CONFIRMER</button>
            </div>
            <div className="FormulaireResetPassword-signin">
                Retour à la
                <Link className="FormulaireResetPassword-signup" to="/connexion">Connexion</Link>
            </div>
        </div>
    );
}

export default FormulaireResetPassword;