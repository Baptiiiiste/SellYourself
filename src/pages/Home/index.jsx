import './Home.css';
import Loader from '../../components/Loader/index'
import React, {useState, useEffect} from 'react';
import HeaderCustom from '../../components/HeaderCustom';
import LeftBar from '../../components/LeftBar';
import HeaderCategories from '../../components/HeaderCategories/index.jsx';
import UneAnnonce from '../../components/UneAnnonce'



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
        <HeaderCustom title="homePage"/>
          <HeaderCategories/>
          <UneAnnonce titre='test annonce titre' 
                      description='' 
                      prix={27} 
                      img_annonce='DefaultPP.jpeg' 
                      nom='test nom' 
                      prenom='test prenom' 
                      img_profil='DefaultPP.jpeg' 
                      note={4.5}/>
      </div>
      
    </div>
    )
}

export default Home;
