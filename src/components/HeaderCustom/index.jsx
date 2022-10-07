import { Link } from 'react-router-dom';
import './headerCustom.css'
function HeaderCustom({title}) {

  if(title == "logForm") return(
    <header>
      <div className="headercustom-logo">
        <img src={require('../../assets/Logo.png')} alt=""/>
        <h1>SellYourself</h1>
        <h1 className='headercustom-point'>.</h1>
        <h1>fr</h1>
      </div>
      <div>
        <Link to="/">Accueil</Link>
      </div>
    </header>
  )

  return (
    <header>
      <div className="headercustom-logo">
        <img src={require('../../assets/Logo.png')} alt=""/>
        <h1>SellYourself</h1>
        <h1 className='headercustom-point'>.</h1>
        <h1>fr</h1>
      </div>
      <div className='headercustom-title'>
        <h1>{title}</h1>
      </div>
    </header>
  );
}

export default HeaderCustom;
