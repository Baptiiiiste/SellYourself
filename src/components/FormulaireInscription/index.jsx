import './FormulaireInscription.css'
import { Link , useNavigate} from 'react-router-dom';
import {useState, useEffect} from 'react';

import bcrypt from "bcryptjs"

const salt = bcrypt.genSaltSync(10);

function FormulaireInscription() {

    const [pseudo, setPseudo] = useState("");
    const [email, setEmail] = useState("");
    const [passwd, setPassword] = useState("");
    const navigate = useNavigate();

    useEffect((navigate) => {
        const connectedUser = localStorage.getItem("user");
        if(connectedUser) navigate("/");
    },[]);

    const collectData = async () => {
        if(!passwd || !email || !pseudo){
            alert("Vous devez renseigner tous les champs pour vous inscrire.");
        }else if(email && passwd && pseudo){
            const password = bcrypt.hashSync(passwd,salt);
            let data = await fetch(`http://localhost:5000/api/inscription`, {
                method: 'post',
                body: JSON.stringify({pseudo, email, password }),
                headers: {
                    'Content-Type':'application/json'
                }
            });
            data = await data.json();
            if(data.authToken){
                localStorage.setItem("user", JSON.stringify(data.user));
                localStorage.setItem("token", JSON.stringify(data.authToken));
                navigate("/");
            }else{
                alert(data.result);
            }
            
        }
        
    }

    return (
        <div className="FormulaireInscription-form">
            <h1>INSCRIPTION</h1>
            <div className='form'>
                <div className="FormulaireInscription-input">
                    <input type="text" name="login" placeholder="IDENTIFIANT" value={pseudo} onChange={(ev) => {setPseudo(ev.target.value)}}/>
                    <input type="email" name="email" placeholder="E-MAIL" value={email} onChange={(ev) => {setEmail(ev.target.value)}}/>
                    <input type="password" name="passwd" placeholder="MOT DE PASSE" value={passwd} onChange={(ev) => {setPassword(ev.target.value)}}/>

                </div>
                <button className="FormulaireInscription-button" onClick={collectData} >S'INSCRIRE </button>
            </div>
            <div className="FormulaireInscription-signin-div">
                Déja inscrit ?
                <Link className="FormulaireInscription-signin" to="/connexion">Se connecter</Link>
            </div>
        </div>
    );
}

export default FormulaireInscription;