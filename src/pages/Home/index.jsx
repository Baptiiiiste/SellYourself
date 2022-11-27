import './Home.css';
import "../../assets/variable.css";
import Loader from '../../components/Loader/index';
import React, {useState, useEffect} from 'react';
import HeaderCustom from '../../components/HeaderCustom';
import LeftBar from '../../components/LeftBar';
import HeaderCategories from '../../components/HeaderCategories/index.jsx';
import UneAnnonce from '../../components/UneAnnonce';

function Home() {
  const [annonces, setAnnonces] = useState([]);
  const [isOk, setIsOk] = useState(false);

  useEffect(() => {
      setIsOk(false);
      getAnnonces();
      setTimeout(() => {
        setIsOk(true);
      }, 500)
      
  }, [])

  const getAnnonces = async () => {
    let result = await fetch(`http://localhost:5000/api/annonces`);
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
        img_annonce={annonce.image} 
        pseudoVendeur={user.pseudo}
        img_profil={user.profilPic}
        note={user.noteList}
        categorie={annonce.categorie}
        key={index}
    />)
  }

  const displayLesAnnonces = () => {

    if(annonces.length !== 0 && isOk){
      const nbAnnonces = annonces[1];
      if(nbAnnonces === 0){
        setTimeout(() => {
          const div = document.querySelector(".Home-lesAnnonces");
          while (div.firstChild!=null) {
            div.removeChild(div.lastChild);
          }
      
          const p = document.createElement("p");
          p.innerHTML = "Aucune annonce disponible";
          p.className = "Home-Aucune";
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

  return !isOk ?
    (
    <Loader/> 
    )
    :
    (<div className="Home">
      <LeftBar/>
      <div className='Home-center'>
        <div className='Home-header'>
          <HeaderCustom title="homePage"/>
          <HeaderCategories/>
        </div>
        <div className='Home-all'>
          <div className='Home-div-Categorie'>
            <p className='Home-categorie'>Catégorie : </p> <p className='Home-display-categorie'>Toutes</p>
          </div>
          <div className='Home-div-search'>
            <p className='Home-search'>Recherche : </p> <p className='Home-display-search'>Toutes</p>
          </div>
          
          <div className='Home-lesAnnonces'>
            {displayLesAnnonces()}
          </div>
        </div>
        
      </div>
    </div>
    )
}

export default Home;
