import "./Conversation.css";
import React from 'react';
import HeaderCustom from "../../components/HeaderCustom";
import LeftBar from "../../components/LeftBar";
import HeaderConversation from "../../components/HeaderConversation";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPaperPlane } from '@fortawesome/free-regular-svg-icons';
import {useState, useEffect} from 'react';
import { useParams } from "react-router-dom";

function Conversation() {
    useEffect(() => {
        getAnnonce();
    }, [])

    const [annonce, setAnnonce] = useState([]);
    const params = useParams();

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