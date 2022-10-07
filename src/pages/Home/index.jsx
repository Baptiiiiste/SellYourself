import './Home.css';
import Loader from '../../components/Loader/index'
import React, {useState, useEffect} from 'react';
import HeaderCustom from '../../components/HeaderCustom';
import LeftBar from '../../components/LeftBar';
import Header_Inscription_Connexion from '../../components/Header_Inscription_Connexion';


function Home() {

  const [loader, setLoader] = useState(true);

  useEffect(() => {
      setTimeout(() => {
          setLoader(false)
      },1250);
  }, [])

  return loader ? 
    (
    <Loader/> 
    )
    :
    (    
    <div className="App">
      <Header_Inscription_Connexion/>
    </div>
    )
}

export default Home;
