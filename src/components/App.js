import '../styles/App.css';
import Loader from './Loader.js'
import React, {useState, useEffect} from 'react';

function App() {

  const [loader, setLoader] = useState(true);

  useEffect(() => {
      setTimeout(() => {
          setLoader(false)
      },1250);
  })

  return (
    loader 
    ? 
    <Loader/> 
    :
    <div className="App">
      <h1>SELL YOURSELF IS COMING SOON</h1>
    </div>
  );
}

export default App;
