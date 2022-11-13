import { Link, useParams } from 'react-router-dom';
import './headerCustom.css'


const searchHandle= async (e)=>{
  let key = e.target.value;
  if(key){
    let result = await fetch(`http://localhost:5000/api/search/${key}`);
    result = result.json()
    if(result){
      //setter sur le contenu de la map
    }
  }else{
    
  }
}

function HeaderCustom({title}) {

  const param = useParams();

  if(title === "logForm") return(
    <header>
      <Link to="/" className="headercustom-logo2">
        <img src={require('../../assets/Logo.png')} alt=""/>
        <h1>SellYourself</h1>
        <h1 className='headercustom-point'>.</h1>
        <h1>fr</h1>
      </Link>
      <div className='headercustom-link'>
        <Link className="headercustom-lien" to="/">Accueil</Link>
      </div>
    </header>
  )

  if(title === "valid"){
    

    return(
      <header>
        <Link to="/" className="headercustom-logo2">
          <img src={require('../../assets/Logo.png')} alt=""/>
          <h1>SellYourself</h1>
          <h1 className='headercustom-point'>.</h1>
          <h1>fr</h1>
        </Link>
        <div className='headercustom-link'>
          <Link className="headercustom-lien" to={"/annonce/" + param.utilisateur + "/" + param.annonce}>Retour</Link>
        </div>
      </header>
    )
  }

  if(title === "homePage") return(
    <div className='headercustom-global'>
      <div className='headercustom-bar'>
        <Link to="/" className="headercustom-logo3">
          <img src={require('../../assets/Logo.png')} alt=""/>
          <h1>SellYourself</h1>
          <h1 className='headercustom-point'>.</h1>
          <h1>fr</h1>
        </Link>
        <div className='headercustom-input'>
          <input type="text" placeholder='Rechercher'onChange={searchHandle}/>
        </div>
        <div className="headercustom-filter">
          <select name="activite" id="activite" className='headercustom-leFiltre'>
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
        <Link to="/" className="headercustom-logo">
          <img src={require('../../assets/Logo.png')} alt=""/>
          <h1>SellYourself</h1>
          <h1 className='headercustom-point'>.</h1>
          <h1>fr</h1>
        </Link>
      <div className='headercustom-title'>
        <h1>{title}</h1>
      </div>
    </header>
  );
}

export default HeaderCustom;
