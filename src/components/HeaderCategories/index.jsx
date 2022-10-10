import { Link } from 'react-router-dom';
import './HeaderCategories.css';

function HeaderCategories() {
  return (
    <div className='headercategorie-container'>
        <li className='headercategorie-content'><Link to="/">Graphisme</Link></li>
        <li className='headercategorie-content'><Link to="/">Musique</Link></li>
        <li className='headercategorie-content'><Link to="/">Programmation</Link></li>
        <li className='headercategorie-content'><Link to="/">Ecriture</Link></li>
        <li className='headercategorie-content'><Link to="/">Litterature</Link></li>
        <li className='headercategorie-content'><Link to="/">Design UI/UX</Link></li>
        <li className='headercategorie-content'><Link to="/">Rédaction</Link></li>
        <li className='headercategorie-content'><Link to="/">Vidéo</Link></li>
        <li className='headercategorie-content'><Link to="/">Animation</Link></li>
        <li className='headercategorie-content'><Link to="/">Marketing Digital</Link></li>
        <li className='headercategorie-content'><Link to="/">Traduction</Link></li>
        <li className='headercategorie-content'><Link to="/">Meuble</Link></li>
        <li className='headercategorie-content'><Link to="/">Immobilier</Link></li>
        <li className='headercategorie-content'><Link to="/"></Link></li>
        <li className='headercategorie-content'><Link to="/">Technologie</Link></li>
        <li className='headercategorie-content'><Link to="/">Technologie</Link></li>
        <li className='headercategorie-content'><Link to="/">Technologie</Link></li>
    </div>
  );
}

export default HeaderCategories;
