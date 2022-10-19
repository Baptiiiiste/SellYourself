import './FormulaireInscription.css'
import { Link , useNavigate} from 'react-router-dom';
import {useState, useEffect} from 'react';

function FormulaireInscription() {

    const [pseudo, setPseudo] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

    useEffect((navigate) => {
        const connectedUser = localStorage.getItem("user");
        if(connectedUser) navigate("/");
    },[]);

    const collectData = async () => {
        let data = await fetch("http://localhost:5000/inscription", {
            method: 'post',
            body: JSON.stringify({pseudo, email, password}),
            headers: {
                'Content-Type':'application/json'
            }
        });
        data = await data.json();
        localStorage.setItem("user", JSON.stringify(data._id));
        navigate("/");
    }

    return (
        <div className="FormulaireInscription-form">
            <h1>INSCRIPTION</h1>
            <div className='form'>
                <div className="FormulaireInscription-input">
                    <input type="text" name="login" placeholder="IDENTIFIANT" value={pseudo} onChange={(ev) => {setPseudo(ev.target.value)}} required/>
                    <input type="email" name="email" placeholder="E-MAIL" value={email} onChange={(ev) => {setEmail(ev.target.value)}} required/>
                    <input type="password" name="password" placeholder="MOT DE PASSE" value={password} onChange={(ev) => {setPassword(ev.target.value)}} required/>
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