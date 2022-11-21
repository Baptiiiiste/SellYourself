import './FormulairePwdForgot.css'
import { Link} from 'react-router-dom';
import { useNavigate } from 'react-router-dom'
import { useState } from "react"

function FormulairePwdForgot() {

    const navigate = useNavigate();
    
    const [email, setEmail] = useState("");


    const sendMail = async () => {
        console.log(email);
        let data = await fetch("http://localhost:5000/api/forgotPwd",{
            method: "POST",
            crossDomain: true,
            headers:{
                "Content-Type":"application/json",
                Accept: "application/json",
                "Access-Control-Allow-Origin": "*",
            },
            body: JSON.stringify({
                email,
            })
        }).then((res)=> res.json())
          .then((data)=>{
            console.log(data,"userRegister");
            alert(data.result);
          });



    }


    return (
        <div className="FormulairePwdForgot-form">
            <h1>Mot de passe oublié ?</h1>
            <div method="FormulairePwdForgot-post">
                <div className="FormulairePwdForgot-input">
                    <input type="email" name="email"  placeholder="E-MAIL" value={email} onChange={(ev) => {setEmail(ev.target.value)}} required/>
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