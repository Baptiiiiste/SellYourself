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

  const getUtilisateur = async (pseudo) => {
    let result = await fetch(`http://localhost:5000/api/utilisateur/${pseudo}`);
    result = await result.json();
    return([result[0].nom, result[0].prenom, result[0].profilPic, result[0].note]);
  }
  
  let lesAnnonces = [];
  
  const displayAnnonces = (listAnnonces) => {

    annonces.forEach(async (item, index)=>{
      const user = await getUtilisateur(item.utilisateur);
      listAnnonces.push(<UneAnnonce titre={item.titre}
                                  description={item.description}
                                  prix={item.prix}
                                  img_annonce={item.img_annonce} 
                                  nom={user[0].nom}
                                  prenom={user[0].prenom} 
                                  img_profil={user[0].profilPic} 
                                  note={user[0].note}
                                  key={item.index}
                                />);
    })
  }

  console.log(lesAnnonces);
  

  return loader ? 
    (
    <Loader/> 
    )
    :
    (    
    <div className="Home" onLoad={displayAnnonces(lesAnnonces)}>
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
            {lesAnnonces}
          </div>
        </div>
        
      </div>
    </div>
    )
}

export default Home;
