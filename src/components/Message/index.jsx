import './Message.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrashCan } from '@fortawesome/free-solid-svg-icons';

function Message({ photo, nom, prenom, text }) {
    const init = nom[0].toUpperCase();
    return(
        <div className='Message'>
            <div className='Message-vendeur'>
                <img className='Message-photo' src={require("../../assets/DefaultPP.jpeg")} alt=""/>
                <p className='Message-prenom'>{prenom}</p>
                <p className='Message-nom'>{init}.</p>
            </div>
            <div className='Message-contenu'>
                <p className='Message-text'>{text}</p>
            </div>
            <button className='Message-button'>
                <FontAwesomeIcon className='Message-delete' icon={faTrashCan}/>
            </button>
        </div>
    )
}

export default Message;