import './FormulaireConnexion.css'
import { Link } from 'react-router-dom';
// import { useNavigate } from 'react-router-dom'
import { useState } from "react"

function FormulaireConnexion() {

    const [pseudo, setPseudo] = useState("");
    const [password, setPassword] = useState("");
    //const navigate = useNavigate();

    // useEffect((navigate) => {
    //     const connectedUser = localStorage.getItem("user");
    //     if(connectedUser) navigate("/");
    // },[]);

    // const collectData = async () => {
    //     let data = await fetch("http://localhost:5000/connexion", {
    //         method: 'post',
    //         body: JSON.stringify({pseudo, password}),
    //         headers: {
    //             'Content-Type':'application/json'
    //         }
    //     });
    //     data = await data.json();
    //     localStorage.setItem("user", JSON.stringify(data._id));
    //     navigate("/");
    // }


    return (
        <div className="FormulaireConnexion-form">
            <h1>CONNEXION</h1>
            <div method="FormulaireConnexion-post">
                <div className="FormulaireConnexion-input">
                    <input type="text" name="login" value={pseudo} onChange={(ev) => {setPseudo(ev.target.value)}} placeholder="IDENTIFIANT" required/>
                    <input type="password" name="password" value={password} onChange={(ev) => {setPassword(ev.target.value)}} placeholder="MOT DE PASSE" required/>
                </div>
                <button  className="FormulaireConnexion-button">SE CONNECTER </button>
            </div>
            <div className="FormulaireConnexion-signup-div">
                Pas encore inscrit ?
                <Link className="FormulaireConnexion-signup" to="/inscription">S'inscrire</Link>
            </div>
        </div>
    );
}

export default FormulaireConnexion;