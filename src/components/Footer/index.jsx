// Import 
import './Footer.css';
import { Link } from 'react-router-dom';

// Composant qui représente les informations générales d'un utilisateur 
function Footer() {

    let pseudo = "Visiteur";
    const connectedUser = sessionStorage.getItem('user');
    
    return (
        <div className='Footer'>
            <div className="Footer-Top">
                <div className="Footer-Left">
                    <Link to="/mentionslegales"> Mentions légales </Link>
                    <Link to="/cgv"> CGV </Link>
                </div>
                <div className="Footer-Middle">
                    <img src={require('../../assets/Logo.png')} alt="" />
                    SellYourself.fr
                </div>
                <div className="Footer-Right">
                    { connectedUser ? 
                    <>                     
                        <Link to="/"> Accueil </Link>
                        <Link to="/publier"> Publier </Link>
                        <Link to="/messages"> Messages </Link>
                        <Link to="/profil"> Notifications </Link>
                        <Link to="/favoris"> Favoris </Link>
                        <Link to="/profil"> Mon Profil </Link>
                    </>
                    :
                    <>                     
                        <Link to="/connexion"> Connexion </Link>
                        <Link to="/inscription"> Inscription </Link>
                    </>
                 }
                </div>
            </div>
            <div className="Footer-Bottom">
                Copyright © Tous droits réservés
            </div>
        </div>
    )
}

export default Footer;