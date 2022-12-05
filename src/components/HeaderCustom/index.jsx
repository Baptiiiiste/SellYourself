// Import 
import { useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import './headerCustom.css'

// Composant qui représente la bar en haut de la page en fonction des pages
function HeaderCustom({ title }) {
  // Variables
  const [categorie, setCategorie] = useState('Toutes');
  const param = useParams();
  const navigate = useNavigate();

  // Récupération des catégories
  setTimeout(() => {
    getCategorie();
  }, 0);

  // Fonction pour récupérer les catégories
  const getCategorie = () => {
    const categorie = document.querySelector('.Categorie-display-categorie');
    if (categorie != null) {
      setCategorie(categorie.innerHTML);
    }
  }

  // Fonction pour rechercher une annonce
  const searchHandle = async (event) => {
    if (event.key === 'Enter') {
      const input = document.querySelector('.headercustom-input-search').value;
      if (input.length === 0) {
        navigate(`/search/${categorie}/Toutes`);
      }
      else {
        navigate(`/search/${categorie}/${input}`);
      }
    }
  }

  // Affichage HTML connection et inscription
  if (title === "logForm") {
    return (
      <header>
        <Link to="/" className="headercustom-logo2">
          <img src={require('../../assets/Logo.png')} alt="" />
          <h1>SellYourself</h1>
          <h1 className='headercustom-point'>.</h1>
          <h1>fr</h1>
        </Link>
        <div className='headercustom-link'>
          <Link className="headercustom-lien" to="/">Accueil</Link>
        </div>
      </header>
    )
  }

  // Afrfichage HTML page validation achat
  if (title === "valid") {
    return (
      <header>
        <Link to="/" className="headercustom-logo2">
          <img src={require('../../assets/Logo.png')} alt="" />
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

  // Affichage HTML page principale
  if (title === "homePage") {
    return (
      <div className='headercustom-global'>
        <div className='headercustom-bar'>
          <Link to="/" className="headercustom-logo3">
            <img src={require('../../assets/Logo.png')} alt="" />
            <h1>SellYourself</h1>
            <h1 className='headercustom-point'>.</h1>
            <h1>fr</h1>
          </Link>
          <div className='headercustom-input'>
            <input className='headercustom-input-search' type="text" placeholder='Rechercher' onKeyDown={searchHandle} />
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
  }

  // Affichage HTML générale
  return (
    <header>
      <Link to="/" className="headercustom-logo">
        <img src={require('../../assets/Logo.png')} alt="" />
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
