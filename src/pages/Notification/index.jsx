// Import
import "./Notification.css";
import HeaderCustom from "../../components/HeaderCustom";
import Notification from "../../components/PageNotification";
import LeftBar from "../../components/LeftBar";
import { React, useState, useEffect } from 'react';

// Page des notifications
function Notifications() {
    // Variables
    let connectedUser = sessionStorage.getItem("user");
    const [notifs, setNotifs] = useState([]);

	useEffect(() => {
		getUserNotif();
	}, [])

    // Fonction pour supprimer toutes les notifications
    const deleteAllNotifs = async () => {
        await fetch(`https://api.sellyourself.fr/api/utilisateur/deleteAllNotif/${JSON.parse(connectedUser).pseudo}`, {
            method: "delete",
            headers: {
                'Content-Type': 'Application/json',
                'Access-Control-Allow-Origin': 'https://sellyourself.fr',
                'Access-Control-Allow-Credentials':true,
                'Access-Control-Allow-Methods':'POST, GET, DELETE, PUT',
                authorization: `bearer ${JSON.parse(sessionStorage.getItem('token'))}`
            }
        });

        window.location.reload(false);
    }

    // Fonction pour récupérer les notifications d'un utilisateur
    const getUserNotif = async () => {
        let a = await fetch(`https://api.sellyourself.fr/api/utilisateur/getNotif/${JSON.parse(connectedUser).pseudo}`, {
            method: "Get",
            headers: {
                'Content-Type': 'Application/json',
                'Access-Control-Allow-Origin': 'https://sellyourself.fr',
                'Access-Control-Allow-Credentials':true,
                'Access-Control-Allow-Methods':'POST, GET',
                authorization: `bearer ${JSON.parse(sessionStorage.getItem('token'))}`
            }
        });
        a = await a.json().then(a => {
            setNotifs(a.listNotifs);
        })
	}
	
    // Affichage HTML
    return (
        <div className='Notifications'>
            <LeftBar/>
            <div className='Notifications-center'>
                <div className="Notifications-header">
                    <HeaderCustom title="Notifications"/>
                </div>
                <div className="Notifications-info">
                    <div className='Notifications-deleteAllButton'>
                        <button className='Notifications-deleteAll' onClick={deleteAllNotifs}>
                            Tout supprimer !
                        </button>
                    </div>
                    {notifs.map(({ type, content, index, _id }) => (
                        <Notification
                        type = {type}
                        info = {content}
                        owner = {(JSON.parse(connectedUser).pseudo)}
                        id = {_id}
                        key={index}
                        />
                    ))} 
                </div>
            </div>
        </div>
    )
}

export default Notifications;