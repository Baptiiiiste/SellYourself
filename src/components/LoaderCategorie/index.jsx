// Import 
import './LoaderCategorie.css';

// Composant qui représente un élément de chargement
function LoaderCategorie() {
  // Affichage HTML
  return(
    <div className='all'>
      <div className="lds-ellipsis">
        <div></div><div></div><div></div><div></div>
      </div>
    </div>
  );
}

export default LoaderCategorie;
