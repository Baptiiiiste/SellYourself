import "./Notification.css";
import React from 'react';
import HeaderCustom from "../../components/HeaderCustom";
import Notification from "../../components/PageNotification";
import LeftBar from "../../components/LeftBar";
import {useState, useEffect} from 'react';


function Notifications() {
    let connectedUser = sessionStorage.getItem("user");

	useEffect(() => {
		getUserNotif();
	}, [])

    const [notifs, setNotifs] = useState([]);

    const deleteAllNotifs = async () => {
    
        await fetch(`http://localhost:5000/api/utilisateur/deleteAllNotif/${JSON.parse(connectedUser).pseudo}`, {
            method: "delete",
            headers: {
                'Content-Type': 'Application/json',
                authorization: `bearer ${JSON.parse(sessionStorage.getItem('token'))}`
            }
        });

        window.location.reload(false);
    }

    const getUserNotif = async () => {
        let listNotifications = [];
        let a = await fetch(`http://localhost:5000/api/utilisateur/getNotif/${JSON.parse(connectedUser).pseudo}`, {
            method: "Get",
            headers: {
                'Content-Type': 'Application/json',
                authorization: `bearer ${JSON.parse(sessionStorage.getItem('token'))}`
            }
        });
        a = await a.json().then(a => {
            setNotifs(a.listNotifs);
        })
	}
	
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