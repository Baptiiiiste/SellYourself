import './Home.css';
import Loader from '../../components/Loader/index'
import React, {useState, useEffect} from 'react';
import HeaderCustom from '../../components/HeaderCustom';
import LeftBar from '../../components/LeftBar';


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
      <LeftBar/>
    </div>
    )
}

export default Home;
