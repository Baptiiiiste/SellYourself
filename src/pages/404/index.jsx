import { Link } from "react-router-dom";
import "./Erreur.css";

function Erreur(){
    return (
        <div className="Erreur">
            <img className="Erreur-img" src={require("../../assets/404.png")} alt=""/>
            <Link className="Erreur-lien" to="/Toutes catégories">Retour à l'accueil</Link>
        </div>
    )
}

export default Erreur;