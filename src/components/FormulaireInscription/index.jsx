// Import 
import './FormulaireInscription.css'
import { Link , useNavigate} from 'react-router-dom';
import {useState, useEffect} from 'react';
import bcrypt from "bcryptjs"

// Sel pour le mot de passe
const salt = bcrypt.genSaltSync(10);

// Composant qui représente le formulaire d'inscription
function FormulaireInscription() {
    // Variables
    const [pseudo, setPseudo] = useState("");
    const [email, setEmail] = useState("");
    const [passwd, setPassword] = useState("");
    const navigate = useNavigate();

    useEffect((navigate) => {
        const connectedUser = sessionStorage.getItem("user");
        if(connectedUser) navigate("/");
    },[]);

    // Fonction pour s'enregistrer
    const signIn = async (e) => {
        if(!passwd || !email || !pseudo){
            alert("Vous devez renseigner tous les champs pour vous inscrire.");
        }else if(email && passwd && pseudo){

            if(!/^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/.test(email)){
               return alert("Format d'adresse e-mail invalide");
            }

            if(passwd.includes(" ")){
                return alert("Mot de passe incorrecte, ne pas utiliser d'espace");
            }

            if(!/^[a-zA-Z0-9_.-]*$/.test(pseudo) || pseudo.includes(" ") || pseudo.length > 15 ){
                return alert("Pseudo incorrecte, n'utiliser que des lettres et des chiffres, l'underscore: _, le point et le tiret et une taille inférieure à 15 caractères");
            }

            e.preventDefault();

            const captcha = document.querySelector('#g-recaptcha-response').value;
            const password = bcrypt.hashSync(passwd,salt);
            const profilPic = await fetch('https://api.thecatapi.com/v1/images/search',{headers: {
                'x-api-key': 'DEMO_API_KEY'
            }})
            .then((response) => {
                return response.json();
            })
            .then((data) => {
                return data[0].url;
            });

            let data = await fetch(`http://localhost:5000/api/inscription`, {
                method: 'POST',
                headers: {
                    'Accept':'application/json, text/plain, */*',
                    'Content-Type':'application/json'
                },
                body:JSON.stringify({pseudo:pseudo, email:email, password:password, captcha:captcha, profilPic:profilPic})
            }).catch((err)=>{console.log(err)});
            data = await data.json().catch(err =>{console.log(err)});
            if(data.authToken){
                sessionStorage.setItem("user", JSON.stringify(data.user));
                sessionStorage.setItem("token", JSON.stringify(data.authToken));
                navigate("/");
            }else{
                alert(data.result);
            }
        }
    }
    
    // Affichage HTML
    return (
        <div className="FormulaireInscription-form">
        <script src="https://www.google.com/recaptcha/api.js"></script>
            <h1>INSCRIPTION</h1>
            <div className='form'>
                <div className="FormulaireInscription-input">
                    <input type="text" name="login" placeholder="IDENTIFIANT" value={pseudo} onChange={(ev) => {setPseudo(ev.target.value)}}/>
                    <input type="email" name="email" placeholder="E-MAIL" value={email} onChange={(ev) => {setEmail(ev.target.value)}} />
                    <input type="password" name="passwd" placeholder="MOT DE PASSE" value={passwd} onChange={(ev) => {setPassword(ev.target.value)}}/>

                </div>
                
                <div className="form-group">
                    <div className="g-recaptcha" data-sitekey="6LeHuQ8jAAAAACgbBCYVuXKB_A9RzzGeJktoqoKv"></div>
                </div>
                
                <button className="FormulaireInscription-button" onClick={signIn} >S'INSCRIRE </button>
            </div>
            <div className="FormulaireInscription-signin-div">
                Déja inscrit ?
                <Link className="FormulaireInscription-signin" to="/connexion">Se connecter</Link>
            </div>

        </div>
        
    );
}

export default FormulaireInscription;