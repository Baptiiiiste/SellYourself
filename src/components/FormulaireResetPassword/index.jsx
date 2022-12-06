import './FormulaireResetPassword.css'
import { Link} from 'react-router-dom';
import { useNavigate } from 'react-router-dom'
// import { useState } from "react"
import { useParams } from 'react-router-dom';


function FormulaireResetPassword() {

    const navigate = useNavigate();
    
    const params = useParams();


    const resetPassword = async () => {

        const pseudo =  params.pseudo;
        const token = params.token;
        const password = "";
        
        let result = await fetch(`http://localhost:5000/api/resetPassword`, {
			method: "post",
            body: JSON.stringify({pseudo, token, password}),
                headers: {
                    'Content-Type': 'Application/json'
                }
			})
            result = await result.json();
            alert(result.result);
            if(result.result !== "Lien invalide, veuillez réessayer" && result.result !== "Session expiré, veuillez recommencer"){
                navigate("/connexion");
            }
    }


    return (
        <div className="FormulaireResetPassword-form">
            <h1>Modifier le mot de passe</h1>
            <div method="FormulaireResetPassword-post">
                <div className="FormulaireResetPassword-input">
                    <input type="password" name="new-password"  placeholder="NOUVEAU MOT DE PASSE" required/>
                </div>
                <div className="FormulaireResetPassword-input">
                    <input type="password" name="confirm-new-password"  placeholder="CONFIRMER LE MOT DE PASSE" required/>
                </div>
                <button onClick={resetPassword} className="FormulaireResetPassword-button">CONFIRMER</button>
            </div>
            <div className="FormulaireResetPassword-signin">
                Retour à la
                <Link className="FormulaireResetPassword-signup" to="/connexion">Connexion</Link>
            </div>
        </div>
    );
}

export default FormulaireResetPassword;