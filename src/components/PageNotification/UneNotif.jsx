import React from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
export function UneNotif({ info , message , logo }) {
    return(
        <div className='Notification-Bloc'>
            <FontAwesomeIcon icon={logo} className="Notification-Image" />
            <div className='Notification-Bloc2'>
                <p id="Notification-Texte1">{info}</p>
                <p id="Notification-Texte2">{message}</p>
            </div>
        </div>
    );
}
