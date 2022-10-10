import { Link } from 'react-router-dom';
import './leftbar.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlus, faMessage, faBell, faHeart, faGear, faRightFromBracket } from '@fortawesome/free-solid-svg-icons'


function Leftbar() {
  return true ?
  (
    <div className='allLeftBar'>
      <div className='LeftBar-NameImg'>
        <div className='LeftBar-ProfilePic'>
          <img src={require('../../assets/DefaultPP.jpeg')} alt=""/>
        </div>
        <div className='LeftBar-username'>
          <p>
            Utilisateur
          </p>
        </div>
      </div>
      <div className='LeftBar-menu'>
        <Link className='LeftBar-Link' to="/connexion">
          <FontAwesomeIcon icon={faPlus} />
          <p className='LeftBar-textMenu'>
            Publier
          </p>
        </Link>
        <Link className='LeftBar-Link' to="/connexion">
          <FontAwesomeIcon icon={faMessage} />
          <p className='LeftBar-textMenu'>
            Messages
          </p>
        </Link>
        <Link className='LeftBar-Link' to="/connexion">
          <FontAwesomeIcon icon={faBell} />
          <p className='LeftBar-textMenu'>
            Notifications
          </p>
        </Link>
        <Link className='LeftBar-Link' to="/connexion">
          <FontAwesomeIcon icon={faHeart} />
          <p className='LeftBar-textMenu'>
            Favoris
          </p>
        </Link>
        <Link className='LeftBar-Link' to="/connexion">
          <FontAwesomeIcon icon={faGear} />
          <p className='LeftBar-textMenu'>
            Mon Compte
          </p>
        </Link>
      </div>
      <div className='LeftBar-logout'>
          <Link className='LeftBar-Link' to="/connexion">
            <FontAwesomeIcon icon={faRightFromBracket} />
            <p className='LeftBar-textMenu'>
              Déconnexion
            </p>
          </Link>
        </div>
    </div>
  )
  :
  (
    <div>
        <Link to="/">Home</Link>
        <Link to="thisPageGoesNowhere">Erreur</Link>
    </div>
  )
}

export default Leftbar;
