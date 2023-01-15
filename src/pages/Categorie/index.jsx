// Import
import './Categorie.css';
import "../../assets/variable.css";
import LoaderCategorie from '../../components/LoaderCategorie';
import React, {useState, useEffect} from 'react';
import HeaderCustom from '../../components/HeaderCustom';
import LeftBar from '../../components/LeftBar';
import HeaderCategories from '../../components/HeaderCategories/index.jsx';
import UneAnnonce from '../../components/UneAnnonce';
import { useParams } from 'react-router-dom';

// Page tri avec catégorie
function Categorie() {
  // Variables
  const params = useParams();
  const [annonces, setAnnonces] = useState([]);
  const categorie = params.categorie;
  const recherche = params.recherche;
  const [isOk, setIsOk] = useState(false);

  useEffect(() => {
      setIsOk(false);
      getAnnonces();
      setTimeout(() => {
        setIsOk(true);
      }, 1000)
      
  }, [params])

  // Fonction pour récupérer les annonces
  const getAnnonces = async () => {
    let result = await fetch(`https://api.sellyourself.fr/api/annonce/search/${categorie}/${recherche}`, {
      method: 'GET'
    });
    result = await result.json();
    setAnnonces(result);
  }

  // Fonction pour afficher une annonce
  const displayAnnonce = (item, index) => {
    const annonce = item[0];
    const user = item[1];
      
    return (<UneAnnonce id={annonce._id}
      titre={annonce.titre}
      description={annonce.description}
      prix={annonce.prix}
      img_annonce={annonce.image} 
      pseudoVendeur={user.pseudo}
      img_profil={user.profilPic}
      note={user.noteList}
      categorie={annonce.categorie}
      vendu={annonce.vendu}
      key={index}
    />)
  }

  // Fonction pour afficher les annonces
  const displayLesAnnonces = () => {
    if(annonces.length !== 0 && isOk){
      const nbAnnonces = annonces[1];

      if(nbAnnonces === 0){
        setTimeout(() => {
          const div = document.querySelector(".Categorie-lesAnnonces");
          while (div.firstChild!=null) {
            div.removeChild(div.lastChild);
          }
      
          const p = document.createElement("p");
          p.innerHTML = "Aucune annonce disponible";
          p.className = "Categorie-Aucune";
          div.appendChild(p);
        },10);
      }

      else{
        return (annonces[0].map((item, index) => (
          displayAnnonce(item, index)
        )))
      }
    }
  }

  // Affichage HTML
  return !isOk ?
    (
    <LoaderCategorie/> 
    )
    :
    (<div className="Categorie">
      <LeftBar/>
      <div className='Categorie-center'>
        <div className='Categorie-header'>
          <HeaderCustom title="homePage"/>
          <HeaderCategories/>
        </div>
        <div className='Categorie-all'>
          <div className='Categorie-div-Categorie'>
            <p className='Categorie-categorie'>Catégorie : </p> <p className='Categorie-display-categorie'>{categorie}</p>
          </div>
          <div className='Categorie-div-search'>
            <p className='Categorie-search'>Recherche : </p> <p className='Categorie-display-search'>{recherche}</p>
          </div>
          
          <div className='Categorie-lesAnnonces'>
            {displayLesAnnonces()}
          </div>
        </div>
        
      </div>
    </div>
    )
}

export default Categorie;
