// Import 
import './Message.css';

<<<<<<< HEAD
function Message({ photo, pseudo, text }) {
=======
// Composant qui représente un message
function Message({ photo, nom, prenom, text }) {
    // Variables
    const init = nom[0].toUpperCase();

    // Affichage HTML
>>>>>>> development
    return(
        <div className='Message'>
            <div className='Message-vendeur'>
                <img className='Message-photo' src={photo} alt=""/>
                <p className='Message-prenom'>{pseudo}</p>
            </div>
            <div className='Message-contenu'>
                <p className='Message-text'>{text}</p>
            </div>
            <div className='Message-button'>
            </div>
        </div>
    )
}

export default Message;