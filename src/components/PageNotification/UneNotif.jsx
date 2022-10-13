import React from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMessage } from '@fortawesome/free-solid-svg-icons';

export function UneNotif({ info , message , logo }) {
    return(
        <div className='Notification-Bloc'>
            <FontAwesomeIcon icon={faMessage} className="Notification-Image" />
            <div className='Notification-Bloc2'>
                <p id="Notification-Texte1">{info}</p>
                <p id="Notification-Texte2">{message}</p>
            </div>
        </div>
    );
}
