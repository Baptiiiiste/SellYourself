// Import 
import './FormulaireConnexion.css'
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom'
import { useState } from "react"

// Composant qui représente le fomulaire de connexion
function FormulaireConnexion() {
    // Variables
    const [pseudo, setPseudo] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

    // Fonction pour se connecter
    const login = async () => {
        let result = await fetch("http://localhost:5000/api/connexion", {
            method: 'post',
            body: JSON.stringify({pseudo, password}),
            headers: {
                'Content-Type': 'application/json'
            }
        });
        result = await result.json();

        let fav = await fetch(`http://localhost:5000/api/viderFav/${pseudo}`, {
            method: 'post',
            headers: {
                'Content-Type': 'application/json'
            }
        });
        fav = await fav.json();
        console.log(JSON.stringify(fav.user));

        if(result.authToken){
            sessionStorage.setItem("user", JSON.stringify(fav.user));
            sessionStorage.setItem("token", JSON.stringify(result.authToken));
            navigate("/");
        }else{
            alert(result.result);
        }
    }

    // Fonction pour se connecter à l'appui de la touche "Enter"
    const verifEnterKey = async(event)=>{
        if(event.key === 'Enter'){
            login();
        }
    }

    // Affichage HTML
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
        </div>
    );
}

export default FormulaireConnexion;