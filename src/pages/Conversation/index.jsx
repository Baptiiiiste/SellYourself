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

    // Appel de fonction pour récupérer l'annonce sujette de la conversation
    useEffect(() => {
        getAnnonce();
    }, [])

    // Déclaration de la variable annonce
    const [annonce, setAnnonce] = useState([]);
    // Pour pouvoir récupérer un paramètre passer par l'URL
    const params = useParams();

    // Fonction pour récupérer l'annonce sujette de la conversation
    const getAnnonce = async () => {
        // Requête à l'API pour récupérer les informations d'une annonce
        let result = await fetch(`http://localhost:5000/api/annonce/${params.annonce}`, {
                method: "Get",
                headers: {
                    'Content-Type': 'Application/json',
                    authorization: `bearer ${JSON.parse(sessionStorage.getItem('token'))}`
                }
            });
        // On récupère les résultats de la requête
        result = await result.json();
        // On met les données dans la variable annonce
        setAnnonce(result);
    }

    // On return l'HTML de la page
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