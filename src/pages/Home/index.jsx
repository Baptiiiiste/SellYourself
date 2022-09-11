import '../../styles/Home.css';
import Loader from '../../components/Loader/index'
import React, {useState, useEffect} from 'react';

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
      <h1>SELL YOURSELF IS COMING SOON</h1>
     </div>
    )
}

export default Home;
