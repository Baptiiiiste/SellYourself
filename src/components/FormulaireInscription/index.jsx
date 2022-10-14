import './FormulaireInscription.css'
import { Link } from 'react-router-dom';
import {useState} from 'react';

function FormulaireInscription() {

    const [pseudo, setPseudo] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    return (
        <div className="FormulaireInscription-form">
            <h1>INSCRIPTION</h1>
            <form method="">
                <div className="FormulaireInscription-input">
                    <input type="text" name="login" placeholder="IDENTIFIANT" value={pseudo} onChange={(ev) => {setPseudo(ev.target.value)}} required/>
                    <input type="email" name="email" placeholder="E-MAIL" value={email} onChange={(ev) => {setEmail(ev.target.value)}} required/>
                    <input type="password" name="password" placeholder="MOT DE PASSE" value={password} onChange={(ev) => {setPassword(ev.target.value)}} required/>
                </div>
                <div className="FormulaireInscription-buttons">
                    <div className="FormulaireInscription-other">
                        <button onClick={() => {}} className="FormulaireInscription-button" >S'INSCRIRE </button>
                    </div>
                </div>
            </form>
            <div className="FormulaireInscription-signin-div">
                Déja inscrit ?
                <Link className="FormulaireInscription-signin" to="/connexion">Se connecter</Link>
            </div>
        </div>
    );
}

export default FormulaireInscription;