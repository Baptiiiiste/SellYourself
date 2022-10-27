import "./Notification.css";
import React from 'react';
import HeaderCustom from "../../components/HeaderCustom";
import Notification from "../../components/PageNotification";
import LeftBar from "../../components/LeftBar";

const notifs = [
    { type: "msg", info: "000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000"},
    { type: "note", info: "4"},
    { type: "client", info: "titre de l'annonce et nom de l'acheteur si renseigné"},
    { type: "fav", info: "titre de l'annonce"},
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
                            Tout supprimer !
                        </button>
                    </div>
                    {notifs.map(({ type, info}, index) => (
                        <Notification
                            type={type}
                            info={info}
                            key={index}/>
                    ))}
                </div>
            </div>
        </div>
    )
}

export default Notifications;