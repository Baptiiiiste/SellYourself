import './notif.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrashCan } from '@fortawesome/free-solid-svg-icons';

function Notification({logo, info, message}) {
    return(
        <div className='Notification-all'>
            <FontAwesomeIcon icon={logo} className="Notification-Image" />
            <div className='Notification-text'>
                <p className="Notification-info">{info}</p>
                <p className="Notification-message">{message}</p>
            </div>
            <button className='Notification-button'>
                <FontAwesomeIcon className='Notification-delete' icon={faTrashCan}/>
            </button>
        </div>
    )
}

export default Notification;