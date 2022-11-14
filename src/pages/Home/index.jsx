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

  const recherche = 'Toutes les annonces';

  const [annonces, setAnnonces] = useState();
  const [categorie, setCategorie] = useState("Toutes catégories");
  const [divCategorie, setDivCategorie] = useState();

  useEffect(() => {
      getAnnonces();
      setTimeout(() => {
          setLoader(false);
          getDivCategorie();
      },1000);
  }, [])

  // useEffect(() => {
  //   getCategorie();
  // }, [divCategorie])

  const getAnnonces = async () => {
    let result = await fetch(`http://localhost:5000/api/annonces`);
    result = await result.json();
    setAnnonces(result);
  }

  const getDivCategorie = () => {
    const div = document.querySelector('.Home-display-categorie');
    setDivCategorie(div);
  }

  const getCategorie = () => {
    const p = divCategorie.innerHTML;
    setCategorie(p);
  }

  const displayAnnonce = (item, index) => {
    const annonce = item[0];
    const user = item[1];

    console.log(categorie);
    if (annonce.categorie = categorie || categorie === 'Toutes categories'){
      
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
  }

  const displayLesAnnonces = () => {
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
      },1000);
    }

    else{
      return (annonces[0].map((item, index) => (
        displayAnnonce(item, index)
      )))
    }
  } 

  // let observer = new MutationObserver(MutationRecord => {
  //   // displayLesAnnonces();
  //   console.log(MutationRecord);
  // })

  // const divCategorie = document.getElementById("categorie");
  // console.log(divCategorie);

  // observer.observe(divCategorie);

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
            <p className='Home-categorie'>Catégorie : </p> <p id='categorie' className='Home-display-categorie'>{categorie}</p>
          </div>
          <div className='Home-div-search'>
            <p className='Home-search'>Recherche : </p> <p className='Home-display-search'>{recherche}</p>
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
