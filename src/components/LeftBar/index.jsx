import { Link } from 'react-router-dom';

function Leftbar() {
  return true ?
  (
    <div className='allLeftBar'>
      <div className='LeftBar-NameImg'>
        <div className='LeftBar-ProfilePic'>
          <img src={require('../../assets/DefaultPP.jpeg')} alt=""/>
        </div>
        <div className='Name'>
          <p>
            Utilisateur
          </p>
        </div>
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
