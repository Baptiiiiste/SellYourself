import './Home.css';
import Loader from '../../components/Loader/index'
import React, {useState, useEffect} from 'react';
import HeaderCustom from '../../components/HeaderCustom';
import LeftBar from '../../components/LeftBar';
import HeaderCategories from '../../components/HeaderCategories';



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
      </div>

    </div>
    )
}

export default Home;
