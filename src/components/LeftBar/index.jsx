// Import 
import './leftbar.css'
import { Link, useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlus, faMessage, faHome, faBell, faHeart, faGear, faRightFromBracket, faLock, faUser, faStar } from '@fortawesome/free-solid-svg-icons'

// Composant qui représente la bar à gauche
function Leftbar() {
  // Variables
  const connectedUser = sessionStorage.getItem('user');
  const navigate = useNavigate();
  let pseudo = "";
  let note;
  let nbNote;
  let profilPic;

  if (connectedUser) {
    pseudo = JSON.parse(connectedUser).pseudo;
    note = JSON.parse(connectedUser).noteList;
    profilPic = JSON.parse(connectedUser).profilPic;
    nbNote = note.length;
    if (nbNote > 0) {
      let moy = 0;
      for (const n of note) {
        moy += parseInt(n.note);
      }
      moy = Number((moy / nbNote).toFixed(2));
      note = moy + "/5";
    }
    else {
      note = "";
    }
  }

  // Fonction pour se déconncter
  const logout = () => {
    sessionStorage.clear();
    navigate("/");
    window.location.reload(false);
  }

  // Affichage HTML
  return connectedUser ?
    (
      <div className='allLeftBar'>
        <div className='LeftBar-NameImg'>
          <div className='LeftBar-ProfilePic'>
            <img className='Leftbar-ProfilImage' src={profilPic} alt="" />
          </div>
          <div className='LeftBar-username'>
            <p>
              {pseudo}
            </p>
            {note !== "" &&
              <div className='LeftBar-Note'>
                {note}
                <FontAwesomeIcon icon={faStar} />
                {"(" + nbNote + " avis )"}
              </div>
            }
          </div>
        </div>
        <div className='LeftBar-menu'>
          <Link className='LeftBar-Link' to="/">
            <FontAwesomeIcon icon={faHome} />
            <p className='LeftBar-textMenu'>
              Accueil
            </p>
          </Link>
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
          <Link className='LeftBar-Link' to="/" onClick={logout}>
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
      <div className='allLeftBar-Visitor'>
        <div className='LeftBar-NameImg'>
          <div className='LeftBar-ProfilePic'>
            <img className='Leftbar-ProfilImage' src={require('../../assets/logoutPP.png')} alt="" />
          </div>
          <div className='LeftBar-username'>
            <p>
              Visiteur
            </p>
          </div>
        </div>
        <div className='LeftBar-menu'>

        <Link className='LeftBar-Link' to="/connexion">
            <FontAwesomeIcon icon={faUser} />
            <p className='LeftBar-textMenu'>
              Connexion
            </p>
          </Link>
          
          <Link className='LeftBar-Link' to="/inscription">
            <FontAwesomeIcon icon={faLock} />
            <p className='LeftBar-textMenu'>
              Inscription
            </p>
          </Link>
          
        </div>
      </div>
    )
}

export default Leftbar;
