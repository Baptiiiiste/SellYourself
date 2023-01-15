// Import 
import './Message.css';

function Message({ photo, pseudo, text }) {
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