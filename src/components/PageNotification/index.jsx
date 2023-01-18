// Import 
import './notif.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMessage, faStar, faCommentDollar, faHeart, faTrashCan } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';

// Composant qui représente une notification
function Notification({type, info, owner, id}) {

    // Fonction pour supprimer une notification
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

    // Affichage HTML notification d'un message
    if(type === "msg")
        return (
            <div className='Notification-all'>
                <div className='Notification-right'>
                    <FontAwesomeIcon icon={faMessage} className="Notification-Image" />
                    <Link className='Notification-text' to="/messages">
                        <p className="Notification-info">Vous avez reçu un nouveau message.</p>
                        <p className="Notification-messageText">{info}</p>
                    </Link>
                </div>
                <button className='Notification-button' onClick={deleteNotif}>
                    <FontAwesomeIcon className='Notification-delete' icon={faTrashCan}/>
                </button>
            </div>
        );
    
    // Affichage HTML notification favoris
    if(type === "fav")
        return (
            <div className='Notification-all'>
                <div className='Notification-right'>
                    <FontAwesomeIcon icon={faHeart} className="Notification-Image" />
                    <div className='Notification-text'>
                        <p className="Notification-info">Un nouveau like.</p>
                        <p className="Notification-message">{info}</p>
                    </div>
                </div>
                <button className='Notification-button' onClick={deleteNotif}>
                    <FontAwesomeIcon className='Notification-delete' icon={faTrashCan}/>
                </button>
            </div>
        );

    // Affichage HTML notification d'un achat
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

    // Affichage HTML notification d'une note
    if(type === "note")
        return (
            <div className='Notification-all'>
                <div className='Notification-right'>
                    <FontAwesomeIcon icon={faStar} className="Notification-Image" />
                    <div className='Notification-text'>
                        <p className="Notification-info">Vous avez reçu une nouvelle note.</p>
                        <p className="Notification-message">{info}</p>
                    </div>
                </div>
                <button className='Notification-button' onClick={deleteNotif}>
                    <FontAwesomeIcon className='Notification-delete' icon={faTrashCan}/>
                </button>
            </div>
        );
}

export default Notification;