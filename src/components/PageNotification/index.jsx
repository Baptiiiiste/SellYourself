// Import 
import './notif.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrashCan } from '@fortawesome/free-solid-svg-icons';
import { faMessage, faStar, faCommentDollar, faHeart } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';

function Notification({type, info, owner, id}) {

    // const navigate = useNavigate();

    const deleteNotif = async () => {
         await fetch(`http://localhost:5000/api/utilisateur/deleteNotif/${owner}/${id}`, {
            method: "delete",
            headers: {
                'Content-Type': 'Application/json',
                authorization: `bearer ${JSON.parse(sessionStorage.getItem('token'))}`
            }
        });
        window.location.reload(false);
    }

    if(type === "msg")
        return (
            <div className='Notification-all'>
                <div className='Notification-right'>
                    <FontAwesomeIcon icon={faMessage} className="Notification-Image" />
                    <Link className='Notification-text' to="/conversation">
                        <p className="Notification-info">Vous avez reçu un nouveau message.</p>
                        <p className="Notification-messageText">{info}</p>
                    </Link>
                </div>
                <button className='Notification-button' onClick={deleteNotif}>
                    <FontAwesomeIcon className='Notification-delete' icon={faTrashCan}/>
                </button>
            </div>
        );
    
    if(type === "fav")
        return (
            <div className='Notification-all'>
                <div className='Notification-right'>
                    <FontAwesomeIcon icon={faHeart} className="Notification-Image" />
                    <div className='Notification-text'>
                        <p className="Notification-info">Une annonce que vous avez aimé n'est plus disponible.</p>
                        <p className="Notification-message">{info}</p>
                    </div>
                </div>
                <button className='Notification-button' onClick={deleteNotif}>
                    <FontAwesomeIcon className='Notification-delete' icon={faTrashCan}/>
                </button>
            </div>
        );

    if(type === "client")
        return (
            <div className='Notification-all'>
                <div className='Notification-right'>
                    <FontAwesomeIcon icon={faCommentDollar} className="Notification-Image" />
                    <div className='Notification-text'>
                        <p className="Notification-info">Votre annonce est vendue.</p>
                        <p className="Notification-message">{info}</p>
                    </div>
                </div>
                <button className='Notification-button' onClick={deleteNotif}>
                    <FontAwesomeIcon className='Notification-delete' icon={faTrashCan}/>
                </button>
            </div>
        );

    if(type === "note")
        return (
            <div className='Notification-all'>
                <div className='Notification-right'>
                    <FontAwesomeIcon icon={faStar} className="Notification-Image" />
                    <div className='Notification-text'>
                        <p className="Notification-info">Vous avez reçu une nouvelle note.</p>
                        <p className="Notification-message">Note : {info}/5</p>
                    </div>
                </div>
                <button className='Notification-button'>
                    <FontAwesomeIcon className='Notification-delete' icon={faTrashCan}/>
                </button>
            </div>
        );
}

export default Notification;