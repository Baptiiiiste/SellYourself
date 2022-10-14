import { Link } from 'react-router-dom';
import './leftbar.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlus, faMessage, faBell, faHeart, faGear, faRightFromBracket, faLock, faUser, faStar } from '@fortawesome/free-solid-svg-icons'


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
          <div className='LeftBar-Note'>
            <p>
              Note : 3.78
            </p>
            <div  className='LeftBar-NoteStar'>
              <FontAwesomeIcon icon={faStar}/>
            </div>
          </div>

        </div>
      </div>
      <div className='LeftBar-menu'>
        <Link className='LeftBar-Link' to="/publier">
          <FontAwesomeIcon icon={faPlus} />
          <p className='LeftBar-textMenu'>
            Publier
          </p>
        </Link>
        <Link className='LeftBar-Link' to="/messages">
          <FontAwesomeIcon icon={faMessage} />
          <p className='LeftBar-textMenu'>
            Messages
          </p>
        </Link>
        <Link className='LeftBar-Link' to="/notifications">
          <FontAwesomeIcon icon={faBell} />
          <p className='LeftBar-textMenu'>
            Notifications
          </p>
        </Link>
        <Link className='LeftBar-Link' to="/favoris">
          <FontAwesomeIcon icon={faHeart} />
          <p className='LeftBar-textMenu'>
            Favoris
          </p>
        </Link>
        <Link className='LeftBar-Link' to="/profil">
          <FontAwesomeIcon icon={faGear} />
          <p className='LeftBar-textMenu'>
            Mon Profil
          </p>
        </Link>
      </div>
      <div className='LeftBar-logout'>
          <Link className='LeftBar-Link' to="/">
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
    <div className='allLeftBar'>
      <div className='LeftBar-NameImg'>
        <div className='LeftBar-ProfilePic'>
          <img src={require('../../assets/logoutPP.png')} alt=""/>
        </div>
        <div className='LeftBar-username'>
          <p>
            Visiteur
          </p>
        </div>
      </div>
      <div className='LeftBar-menu'>
        <Link className='LeftBar-Link' to="/inscription">
          <FontAwesomeIcon icon={faLock} />
          <p className='LeftBar-textMenu'>
            Inscription
          </p>
        </Link>
        <Link className='LeftBar-Link' to="/connexion">
          <FontAwesomeIcon icon={faUser} />
          <p className='LeftBar-textMenu'>
            Connexion
          </p>
        </Link>
        </div>
    </div>
  )
}

export default Leftbar;
