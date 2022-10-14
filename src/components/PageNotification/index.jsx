import './notif.css';
import { ScrollMenu } from "react-horizontal-scrolling-menu";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMessage, faStar, faCommentDollar, faHeart } from '@fortawesome/free-solid-svg-icons';
import { UneNotif } from "./UneNotif.jsx";

const notifs = [
  
    { info: "Vous avez reçu un nouveau message.",message: "Cliquez sur “Messages” pour le consulter",logo: faMessage},
    { info: "Vous avez reçu une nouvelle note.", message: "Vous avez reçu 4/5", logo: faStar},
    { info: "Vous avez un nouveau client.", message: "Cliquez sur “Messages” pour échanger avec lui.", logo: faCommentDollar},
    { info: "Une annonce que vous avez aimé a été modifié.", message: "Cliquez sur “Favoris” pour la voir.", logo: faHeart},

]

function Notification() {
    return(
        <div className='Notification-principale'>
            <ScrollMenu
            onWheel={onWheel}>
            <div className='Notification-Notif'>
              {notifs.map(({ info,message,logo }, index) => (
                  <UneNotif
                    info={info}
                    message={message}
                    logo={logo}
                    key={index}
                  >
                  </UneNotif>
              ))}
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

  
  


export default Notification;