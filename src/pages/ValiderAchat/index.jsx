import './validation.css';
import React, {useState, useEffect} from 'react';
import { useParams } from 'react-router-dom';
import Validation from '../../components/PageValider';
import HeaderCustom from '../../components/HeaderCustom';

function ValiderAchat() {

  useEffect(() => {
    getAnnonce();
  }, [])

  const [annonce, setAnnonce] = useState([]);
  const params = useParams();

  const getAnnonce = async () => {
      let result = await fetch(`http://localhost:5000/api/annonce/${params.annonce}`);
      result = await result.json();
      setAnnonce(result);
  }

  return(
    <div className="Achat">
      <HeaderCustom title="valid" className="Achat-header"/>
      <div className='Achat-bas'>
        <div className='Achat-formulaire'>
          <Validation className="Achat-form" annonce={annonce}/>
        </div>
        <div className="Achat-image">
          <img className="Achat-img-login" src={require('../../assets/Credit.png')} alt=""/>
        </div>
      </div>
    </div>
  )
}

export default ValiderAchat;
