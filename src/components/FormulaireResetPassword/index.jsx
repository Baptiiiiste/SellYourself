import './FormulaireResetPassword.css'
import { Link} from 'react-router-dom';
import { useNavigate } from 'react-router-dom'
import { useState } from "react"
import { useParams } from 'react-router-dom';
import bcrypt from "bcryptjs";



function FormulaireResetPassword() {

    const navigate = useNavigate();
    
    const params = useParams();

    const [password, setPassword] = useState("");
    const [confirm_password, setConfirmPassword] = useState("");

    const salt = bcrypt.genSaltSync(10);


    const resetPassword = async () => {

        if(!password || !confirm_password){
            alert("Vous devez renseigner tous les champs pour réinitialiser le mot de passe.");
        }else if(password && confirm_password){
            

            if(password.includes(" ") || confirm_password.includes(" ")){
                return alert("Mot de passe incorrecte, ne pas utiliser d'espace");
            }


            if(password !== confirm_password){
                return alert("Les mots de passes ne sont pas identiques");
            }

            const password = bcrypt.hashSync(password,salt);

            const pseudo =  params.pseudo;
            const token = params.token;
        
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

        
    }


    return (
        <div className="FormulaireResetPassword-form">
            <h1>Modifier le mot de passe</h1>
            <div method="FormulaireResetPassword-post">
                <div className="FormulaireResetPassword-input">
                    <input type="password" name="new-password" value={password} onChange={(ev) => {setPassword(ev.target.value)}} placeholder="NOUVEAU MOT DE PASSE" required/>
                </div>
                <div className="FormulaireResetPassword-input">
                    <input type="password" name="confirm-new-password" value={confirm_password} onChange={(ev) => {setConfirmPassword(ev.target.value)}} placeholder="CONFIRMER LE MOT DE PASSE" required/>
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