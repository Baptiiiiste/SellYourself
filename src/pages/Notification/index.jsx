import "./Notification.css";
import React from 'react';
import HeaderCustom from "../../components/HeaderCustom";
import Notification from "../../components/PageNotification";
import LeftBar from "../../components/LeftBar";
import {useState, useEffect} from 'react';



const notifs = [
    { type: "msg", info: "000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000"},
    { type: "note", info: "4"},
    { type: "client", info: "titre de l'annonce et nom de l'acheteur si renseigné"},
    { type: "fav", info: "titre de l'annonce"},
]

const deleteAllNotifs = async () => {
    
    // let result = await fetch(`http://localhost:5000/api/utilisateur/deleteAllNotif/${JSON.parse(connectedUser).pseudo}`, {
    //     method: "delete",
    //     headers: {
    //         'Content-Type': 'Application/json',
    //         authorization: `bearer ${JSON.parse(sessionStorage.getItem('token'))}`
    //     }
    // });
}

function Notifications() {
    let connectedUser = sessionStorage.getItem("user");

	useEffect(() => {
		getUserNotif();
	}, [])

    const [notifs, setNotifs] = useState([]);

    const getUserNotif = async () => {
		let listNotifs = [];
		for(let i = 0; i < (JSON.parse(connectedUser).notifications).length; i++){
			let a = await fetch(`http://localhost:5000/api/utilisateur/getNotif/${JSON.parse(connectedUser).pseudo}/${JSON.parse(connectedUser).notifications[i]}`, {
				method: "Get",
				headers: {
					'Content-Type': 'Application/json',
					authorization: `bearer ${JSON.parse(sessionStorage.getItem('token'))}`
				}
			});
			a = await a.json()
                .then(a => listNotifs.push(a));
                
            console.log(a);
		}
		setNotifs(listNotifs)
	}
	
	const displayNotifs = (item, index) => {
		const notif = item;
        
		return (<Notification
			type = {notif.type}
			info = {notif.content}
			// owner = {[(JSON.parse(connectedUser).pseudo), (JSON.parse(connectedUser)._id)]}
			key={index}
		/>)

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
                    {notifs.map(({ item, index }) => (
                        displayNotifs(item, index)
                    ))}
                </div>
            </div>
        </div>
    )
}

export default Notifications;