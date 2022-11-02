import './Home.css';
import Loader from '../../components/Loader/index';
import React, {useState, useEffect} from 'react';
import HeaderCustom from '../../components/HeaderCustom';
import LeftBar from '../../components/LeftBar';
import HeaderCategories from '../../components/HeaderCategories/index.jsx';
import UneAnnonce from '../../components/UneAnnonce';

const annonces = [
  {titre:'test annonce titre',
  description:'OOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOO',
  prix:27,
  img_annonce:'DefaultPP.jpeg',
  nom:'test nom',
  prenom:'test prenom', 
  img_profil:'DefaultPP.jpeg', 
  note:4.5},

  {titre:'test annonce titre',
  description:'OOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOO',
  prix:27,
  img_annonce:'DefaultPP.jpeg',
  nom:'test nom',
  prenom:'test prenom', 
  img_profil:'DefaultPP.jpeg', 
  note:4.5},

  {titre:'test annonce titre',
  description:'OOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOO',
  prix:27,
  img_annonce:'DefaultPP.jpeg',
  nom:'test nom',
  prenom:'test prenom', 
  img_profil:'DefaultPP.jpeg', 
  note:4.5},

  {titre:'test annonce titre',
  description:'OOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOO',
  prix:27,
  img_annonce:'DefaultPP.jpeg',
  nom:'test nom',
  prenom:'test prenom', 
  img_profil:'DefaultPP.jpeg', 
  note:4.5},

  {titre:'test annonce titre',
  description:'OOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOO',
  prix:27,
  img_annonce:'DefaultPP.jpeg',
  nom:'test nom',
  prenom:'test prenom', 
  img_profil:'DefaultPP.jpeg', 
  note:4.5}
]

function Home() {

  const [loader, setLoader] = useState(true);

  useEffect(() => {
      setTimeout(() => {
          setLoader(false)
      },1000);
  }, [])

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
          <p className='Home-categorie'>Catégorie : </p>
          <p className='Home-search'>Recherche : </p> 
          <div className='Home-lesAnnonces'>
            {annonces.map(({titre, description, prix, img_annonce, nom, prenom, img_profil, note}, index) => (
              <UneAnnonce titre={titre}
                description={description}
                prix={prix}
                img_annonce={img_annonce} 
                nom={nom}
                prenom={prenom} 
                img_profil={img_profil} 
                note={note}
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
