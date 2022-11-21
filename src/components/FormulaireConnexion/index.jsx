import './FormulaireConnexion.css'
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom'
import { useState } from "react"

function FormulaireConnexion() {

    const [pseudo, setPseudo] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

    const login = async () => {
        let result = await fetch("http://localhost:5000/api/connexion", {
            method: 'post',
            body: JSON.stringify({pseudo, password}),
            headers: {
                'Content-Type': 'application/json'
            }
        });
        result = await result.json();
        if(result.authToken){
            sessionStorage.setItem("user", JSON.stringify(result.user));
            sessionStorage.setItem("token", JSON.stringify(result.authToken));
            navigate("/");
        }else{
            alert(result.result);
        }
    }

    const verifEnterKey = async(event)=>{
        if(event.key === 'Enter'){
            login();
        }
    }

    return (
        <div className="FormulaireConnexion-form">
            <h1>CONNEXION</h1>
            <div method="FormulaireConnexion-post">
                <div className="FormulaireConnexion-input">
                    <input type="text" name="login" value={pseudo} onChange={(ev) => {setPseudo(ev.target.value)}} placeholder="IDENTIFIANT" required/>
                    <input type="password" name="password" value={password} onChange={(ev) => {setPassword(ev.target.value)}} placeholder="MOT DE PASSE" required onKeyDown={verifEnterKey}/>
                </div>
                <button onClick={login} className="FormulaireConnexion-button">SE CONNECTER </button>
            </div>
            <div className="FormulaireConnexion-signup-div">
                Pas encore inscrit ?
                <Link className="FormulaireConnexion-signup" to="/inscription">S'inscrire</Link>
            </div>
            <div className="FormulaireConnexion-password-forgot">
                <Link className="FormulaireConnexion-signup" to="/forgotPwd">Mot de passe oublié ?</Link>
            </div>
        </div>
    );
}

export default FormulaireConnexion;