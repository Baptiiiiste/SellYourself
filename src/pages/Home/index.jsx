import './Home.css';
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
          setLoader(false)
      },1000);

      getAnnonces();
  }, [])

  const getAnnonces = async () => {
    let result = await fetch("http://localhost:5000/api/annonce");
    result = await result.json();
    setAnnonces(result);
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
            {annonces.map(({_id, titre, description, prix, img_annonce, utilisateur}, index) => (
                <UneAnnonce id={_id}
                  titre={titre}
                  description={description}
                  prix={prix}
                  img_annonce={img_annonce} 
                  pseudoVendeur={utilisateur}
                  key={index}
                />
              ))}
          </div>
        </div>
        
      </div>
    </div>
    )
}

export default Home;
