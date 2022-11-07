import './Home.css';
import Loader from '../../components/Loader/index';
import React, {useState, useEffect} from 'react';
import HeaderCustom from '../../components/HeaderCustom';
import LeftBar from '../../components/LeftBar';
import HeaderCategories from '../../components/HeaderCategories/index.jsx';
import UneAnnonce from '../../components/UneAnnonce';

// const annonces = [
//   {titre:'test annonce titre',
//   description:'OOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOO',
//   prix:27,
//   img_annonce:'DefaultPP.jpeg',
//   nom:'test nom',
//   prenom:'test prenom', 
//   img_profil:'DefaultPP.jpeg', 
//   note:4.5},

//   {titre:'test annonce titre',
//   description:'OOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOO',
//   prix:27,
//   img_annonce:'DefaultPP.jpeg',
//   nom:'test nom',
//   prenom:'test prenom', 
//   img_profil:'DefaultPP.jpeg', 
//   note:4.5},

//   {titre:'test annonce titre',
//   description:'OOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOO',
//   prix:27,
//   img_annonce:'DefaultPP.jpeg',
//   nom:'test nom',
//   prenom:'test prenom', 
//   img_profil:'DefaultPP.jpeg', 
//   note:4.5},

//   {titre:'test annonce titre',
//   description:'OOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOO',
//   prix:27,
//   img_annonce:'DefaultPP.jpeg',
//   nom:'test nom',
//   prenom:'test prenom', 
//   img_profil:'DefaultPP.jpeg', 
//   note:4.5},

//   {titre:'test annonce titre',
//   description:'OOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOO',
//   prix:27,
//   img_annonce:'DefaultPP.jpeg',
//   nom:'test nom',
//   prenom:'test prenom', 
//   img_profil:'DefaultPP.jpeg', 
//   note:4.5}
// ]

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
    return(result);
  }

  const annonce = [];

  const displayAnnonces = async () => {
    console.log('oui');

    for( let i = 0; i < annonces.length; i++){
      const user = getUtilisateur(annonces[i].utilisateur);

    //   annonce.push({titre:'test annonce titre',
    //     description:'OOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOO',
    //     prix:27,
    //     img_annonce:'DefaultPP.jpeg',
    //     nom:'test nom',
    //     prenom:'test prenom', 
    //     img_profil:'DefaultPP.jpeg', 
    //     note:4.5});
    }
  }

  return loader ? 
    (
    <Loader/> 
    )
    :
    (    
    <div className="Home" onLoad={displayAnnonces}>
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
            {/* {annonce.map((item, index) => (
              <UneAnnonce titre={item.titre}
                description={item.description}
                prix={item.prix}
                img_annonce={item.img_annonce} 
                nom={item.nom}
                prenom={item.prenom} 
                img_profil={item.img_profil} 
                note={item.note}
                key={item.index}
              />
            ))} */}
          </div>
        </div>
        
      </div>
    </div>
    )
}

export default Home;
