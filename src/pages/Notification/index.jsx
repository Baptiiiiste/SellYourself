import "./Notification.css";
import React from 'react';
import HeaderCustom from "../../components/HeaderCustom";
import Notification from "../../components/PageNotification";
import LeftBar from "../../components/LeftBar";

function Notifications() {
    return (
        <div className='Notification'>
            <LeftBar/>
            <div className='Notification-center'>
                <HeaderCustom title="Notification"/>
                <Notification/>
            </div>
        </div>
    )
}

export default Notifications;