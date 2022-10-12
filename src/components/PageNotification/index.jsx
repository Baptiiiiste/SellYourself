import './notif.css';
import { ScrollMenu } from "react-horizontal-scrolling-menu";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMessage } from '@fortawesome/free-solid-svg-icons';

// const notifs = [
  
//     { name: "Graphisme"},
//     { name: "Musique"},

// ]

function CreerAnnonce() {
    return(
        <div className='Notification-principale'>
            <ScrollMenu
            onWheel={onWheel}>

                <div className='Notification-Bloc'>
                    <FontAwesomeIcon icon={faMessage} className="Notification-Image" />
                    <div className='Notification-Bloc2'>
                        <p id="Notification-Texte1">Vous avez reçu un nouveau message</p>
                        <p id="Notification-Texte2">Cliquez sur "Messages" pour le consulter</p>
                    </div>
                </div>

            </ScrollMenu>

        </div>
    )
}


function onWheel(apiObj, ev) {
    const isThouchpad = Math.abs(ev.deltaX) !== 0 || Math.abs(ev.deltaY) < 15;
  
    if (isThouchpad) {
      ev.stopPropagation();
      return;
    }
  
    if (ev.deltaY < 0) {
      apiObj.scrollNext();
    } else if (ev.deltaY > 0) {
      apiObj.scrollPrev();
    }
  }

  
  


export default CreerAnnonce;