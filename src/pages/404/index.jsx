import { Link } from "react-router-dom";
import "./Erreur.css";

function Erreur(){
    return (
        <div className="Erreur">
            <img className="Erreur-img" src={require("../../assets/404.png")}/>
            <Link className="Erreur-lien" to="/">Retour à l'accueil</Link>
        </div>
    )
}

export default Erreur;