// Import 
import './Footer.css';
import { Link } from 'react-router-dom';

// Composant qui représente les informations générales d'un utilisateur 
function Footer() {

    // Affichage HTML
    return (
        <div className='Footer'>
            <div className="Footer-Left">
                <Link to="/mentionslegales"> Mentions légales </Link>
                <Link to="/cgv"> CGV </Link>
            </div>
            <div className="Footer-Bottom">
                Copyright © Tous droits réservés
            </div>
        </div>
    )
}

export default Footer;