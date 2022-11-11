import './Home.css';
import "../../assets/variable.css";
import Loader from '../../components/Loader/index';
import React, {useState, useEffect} from 'react';
import HeaderCustom from '../../components/HeaderCustom';
import LeftBar from '../../components/LeftBar';
import HeaderCategories from '../../components/HeaderCategories/index.jsx';
import UneAnnonce from '../../components/UneAnnonce';

function Home() {

  const [loader, setLoader] = useState(true);

  const categorie = 'Toutes les catégories';
  const recherche = 'Toutes les annonces';

  const [annonces, setAnnonces] = useState([]);

  useEffect(() => {
      setTimeout(() => {
          setLoader(false);
      },1000);
      getAnnonces();
  }, [])

  const getAnnonces = async () => {
    let result = await fetch("http://localhost:5000/api/annonce");
    result = await result.json();
    if(result.length === 0){
      const div = document.querySelector(".Home-lesAnnonces");
      
      while (div.firstChild) {
        div.removeChild(div.lastChild);
      }

      const p = document.createElement("p");
      p.innerHTML = "Aucune annonce disponible";
      p.className = "Home-Aucune";
      div.appendChild(p);
    }
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

  return loader ? 
    (
    <Loader/> 
    )
    :
    (    
    <div className="Home">
      <LeftBar/>
      <div className='Home-center'>
        <div className='Home-header'>
          <HeaderCustom title="homePage"/>
          <HeaderCategories/>
        </div>
        <div className='Home-all'>
          <div className='Home-div-Categorie'>
            <p className='Home-categorie'>Catégorie : </p> <p className='Home-display-categorie'>{categorie}</p>
          </div>
          <div className='Home-div-search'>
            <p className='Home-search'>Recherche : </p> <p className='Home-display-search'>{recherche}</p>
          </div>
          
          <div className='Home-lesAnnonces'>
            {annonces.map((item, index) => (
              displayAnnonce(item, index)
              ))}
          </div>
        </div>
        
      </div>
    </div>
    )
}

export default Home;
