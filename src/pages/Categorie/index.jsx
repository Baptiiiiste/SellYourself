import './Categorie.css';
import "../../assets/variable.css";
import LoaderCategorie from '../../components/LoaderCategorie';
import React, {useState, useEffect} from 'react';
import HeaderCustom from '../../components/HeaderCustom';
import LeftBar from '../../components/LeftBar';
import HeaderCategories from '../../components/HeaderCategories/index.jsx';
import UneAnnonce from '../../components/UneAnnonce';
import { useParams } from 'react-router-dom';

function Categorie() {
  const [loaderCategorie, setLoaderCategorie] = useState(true);

  const params = useParams();
  const [annonces, setAnnonces] = useState();
  const categorie = params.categorie;
  const recherche = params.recherche;

  useEffect(() => {
      getAnnonces();
      setTimeout(() => {
          setLoaderCategorie(false);
      },500);
      
  }, [])

  const getAnnonces = async () => {
    let result = await fetch(`http://localhost:5000/api/annonce/search/${categorie}/${recherche}`, {
      headers: { authorization: `bearer ${JSON.parse(sessionStorage.getItem('token'))}` }
    });
    result = await result.json();
    setAnnonces(result);
  }

  const displayAnnonce = (item, index) => {
    const annonce = item[0];
    const user = item[1];
      
    return (<UneAnnonce id={annonce._id}
      titre={annonce.titre}
      description={annonce.description}
      prix={annonce.prix}
      img_annonce={annonce.img_annonce} 
      pseudoVendeur={user.pseudo}
      img_profil={user.profilPic}
      note={user.noteList}
      key={index}
    />)
  }

  const displayLesAnnonces = () => {
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
      },200);
    }

    else{
      return (annonces[0].map((item, index) => (
        displayAnnonce(item, index)
      )))
    }
  }

  return loaderCategorie ? 
    (
    <LoaderCategorie/> 
    )
    :
    (    
    <div className="Categorie">
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
