import { Link } from 'react-router-dom';
import './leftbar.css'

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
          <img src={require('../../assets/addLogo.png')} alt="" className='LeftBar-menuImage'/>
          <p className='LeftBar-textMenu'>
            Publier
          </p>
        </Link>
        <Link className='LeftBar-Link' to="/connexion">
          <img src={require('../../assets/messageLogo.png')} alt="" className='LeftBar-menuImage'/>
          <p className='LeftBar-textMenu'>
            Messages
          </p>
        </Link>
      </div>
    </div>
  )
  :
  (
    <div>
        <Link to="/">Home</Link>
        <Link to="thisPageGoesNowhere">erreur</Link>
    </div>
  )
}

export default Leftbar;
