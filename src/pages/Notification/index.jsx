import "./Notification.css";
import React from 'react';
import HeaderCustom from "../../components/HeaderCustom";
import Notification from "../../components/PageNotification";
import LeftBar from "../../components/LeftBar";
import { faMessage, faStar, faCommentDollar, faHeart } from '@fortawesome/free-solid-svg-icons';

const notifs = [
    { info: "Vous avez reçu un nouveau message.",message: "Cliquez sur “Messages” pour le consulter",logo: faMessage},
    { info: "Vous avez reçu une nouvelle note.", message: "Vous avez reçu 4/5", logo: faStar},
    { info: "Vous avez un nouveau client.", message: "Cliquez sur “Messages” pour échanger avec lui.", logo: faCommentDollar},
    { info: "Une annonce que vous avez aimé a été modifié.", message: "Cliquez sur “Favoris” pour la voir.", logo: faHeart},
    { info: "Une annonce que vous avez aimé a été modifié.", message: "Cliquez sur “Favoris” pour la voir.", logo: faHeart},
    { info: "Une annonce que vous avez aimé a été modifié.", message: "Cliquez sur “Favoris” pour la voir.", logo: faHeart},
    { info: "Une annonce que vous avez aimé a été modifié.", message: "Cliquez sur “Favoris” pour la voir.", logo: faHeart},
    { info: "Une annonce que vous avez aimé a été modifié.", message: "Cliquez sur “Favoris” pour la voir.", logo: faHeart},
]

function Notifications() {
    return (
        <div className='Notifications'>
            <LeftBar/>
            <div className='Notifications-center'>
                <div className="Notifications-header">
                    <HeaderCustom title="Notifications"/>
                </div>
                <div className="Notifications-info">
                    <div className='Notifications-deleteAllButton'>
                        <button className='Notifications-deleteAll'>
                            Supprimer tous !
                        </button>
                    </div>
                    {notifs.map(({ info,message,logo }, index) => (
                        <Notification
                            info={info}
                            message={message}
                            logo={logo}
                            key={index}/>
                    ))}
                </div>
            </div>
        </div>
    )
}

export default Notifications;