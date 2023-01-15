// Import
import './FormulairePwdForgot.css'
import { Link, useNavigate } from 'react-router-dom'
import { useState } from "react"

// Composant qui représente le formulaire d'oubli de mot de passe
function FormulairePwdForgot() {
    // Variables
    const navigate = useNavigate();
    const [email, setEmail] = useState("");

    // Fonction pour envoyer un mail
    const sendMail = async () => {
        if(!/^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/.test(email)){
            return alert("Format d'adresse e-mail invalide");
        }
        console.log(email);
        let data = await fetch("https://api.sellyourself.fr/api/forgotPwd",{
            method: "POST",
            crossDomain: true,
            headers:{
                'Access-Control-Allow-Origin': 'https://sellyourself.fr/',
                'Access-Control-Allow-Credentials':true,
                'Access-Control-Allow-Methods':'POST, GET',
                "Content-Type":"application/json"
            },
            body: JSON.stringify({
                email,
            })
        })
        data = await data.json();
        if(data.result) alert(data.result);    
        navigate("/connexion");
    }

    // Fonction de validation touche entrer
    const verifEnterKey = async(event)=>{
        if(event.key === 'Enter'){
            sendMail();
        }
    
    }

    // Affichage HTML
    return (
        <div className="FormulairePwdForgot-form">
            <h1>Mot de passe oublié ?</h1>
            <div method="FormulairePwdForgot-post">
                <div className="FormulairePwdForgot-input">
                    <input type="email" name="email"  placeholder="E-MAIL" value={email} onChange={(ev) => {setEmail(ev.target.value)}} required onKeyDown={verifEnterKey}/>
                </div>
                <button onClick={sendMail} className="FormulairePwdForgot-button">CONFIRMER</button>
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