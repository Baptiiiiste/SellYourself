import { Link } from 'react-router-dom';
import './headerCustom.css'

function HeaderCustom({title}) {

  if(title === "logForm") return(
    <header>
      <div className="headercustom-logo2">
        <img src={require('../../assets/Logo.png')} alt=""/>
        <h1>SellYourself</h1>
        <h1 className='headercustom-point'>.</h1>
        <h1>fr</h1>
      </div>
      <div className='headercustom-link'>
        <Link className="headercustom-lien" to="/">Accueil</Link>
      </div>
    </header>
  )

  if(title === "homePage") return(
    <div className='headercustom-global'>
      <div className='headercustom-bar'>
        <div className="headercustom-logo3">
          <img src={require('../../assets/Logo.png')} alt=""/>
          <h1>SellYourself</h1>
          <h1 className='headercustom-point'>.</h1>
          <h1>fr</h1>
        </div>
        <div className='headercustom-input'>
          <input placeholder='Rechercher'/>
        </div>
        <div className="headercustom-filter">
          <select name="activite" id="activite">
            <option value="default">Filtrer</option>
            <option value="Cat1">Categorie 1</option>
            <option value="Cat2">Categorie 2</option>
            <option value="Cat3">Categorie 3</option>
            <option value="Cat4">Categorie 4</option>
          </select>
        </div>
      </div>
     
    </div>
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
