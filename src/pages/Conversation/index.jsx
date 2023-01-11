// Import
import "./Conversation.css";
import React from 'react';
import HeaderCustom from "../../components/HeaderCustom";
import LeftBar from "../../components/LeftBar";
import HeaderConversation from "../../components/HeaderConversation";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPaperPlane } from '@fortawesome/free-regular-svg-icons';
import {useState, useEffect} from 'react';
import { useParams } from "react-router-dom";

// Page de conversation (propre à deux utilisateurs et une annonce)
function Conversation() {
    // Variables
    const [annonce, setAnnonce] = useState([]);
    const params = useParams();

    useEffect(() => {
        getAnnonce();
    }, [])

    

    // Fonction pour récupérer l'annonce de la conversation
    const getAnnonce = async () => {
        let result = await fetch(`http://localhost:5000/api/annonce/${params.annonce}`, {
                method: "Get",
                headers: {
                    'Content-Type': 'Application/json',
                    authorization: `bearer ${JSON.parse(sessionStorage.getItem('token'))}`
                }
            });
        result = await result.json();
        setAnnonce(result);
    }

    // Affichage HTML 
    return (
        <div className='Conversation'>
            <LeftBar/>
            <div className='Conversation-center'>
                <div className="Conversation-header">
                    <HeaderCustom title="Conversation"/>
                </div>
                <div className="Conversation-info">
                    <HeaderConversation 
                        image={annonce.image}
                        titre={annonce.titre}
                        description={annonce.description}
                        id={annonce._id}
                        vendu={annonce.vendu}
                        user={annonce.utilisateur}
                    />
                    <div className="Conversation-newMessage">
                        <input className="Conversation-bar" placeholder="Envoyer un message"/>
                        <button className="Conversation-envoyer">
                            Envoyer
                            <FontAwesomeIcon className="Conversation-icon" icon={faPaperPlane}/>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Conversation;