import "./Conversation.css";
import React from 'react';
import HeaderCustom from "../../components/HeaderCustom";
import LeftBar from "../../components/LeftBar";
import HeaderConversation from "../../components/HeaderConversation";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPaperPlane } from '@fortawesome/free-regular-svg-icons'

function Conversation() {
    return (
        <div className='Conversation'>
            <LeftBar/>
            <div className='Conversation-center'>
                <div className="Conversation-header">
                    <HeaderCustom title="Conversation"/>
                </div>
                <div className="Conversation-info">
                    <HeaderConversation 
                        titre="titre de l'annonce"
                        description="OOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOO"
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